import requests
import sys
from datetime import datetime
import time

class DahmiLogisticsAPITester:
    def __init__(self, base_url="https://cargo-connect-562.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, passed, details=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ PASSED: {test_name}")
        else:
            print(f"❌ FAILED: {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            "test": test_name,
            "passed": passed,
            "details": details
        })

    def test_api_health(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            passed = response.status_code == 200
            details = f"Status: {response.status_code}, Response: {response.json() if passed else response.text}"
            self.log_result("API Health Check (GET /api/)", passed, details)
            return passed
        except Exception as e:
            self.log_result("API Health Check (GET /api/)", False, f"Error: {str(e)}")
            return False

    def test_create_contact_valid(self):
        """Test POST /api/contact with valid payload"""
        try:
            payload = {
                "name": "Test User",
                "phone": "9903830332",
                "email": "test@example.com",
                "service_interest": "FTL",
                "message": "This is a test message for contact form",
                "language": "en"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            passed = response.status_code == 200
            if passed:
                data = response.json()
                # Verify response contains expected fields
                has_id = "id" in data
                has_name = data.get("name") == payload["name"]
                has_phone = data.get("phone") == payload["phone"]
                has_service = data.get("service_interest") == payload["service_interest"]
                passed = has_id and has_name and has_phone and has_service
                details = f"Status: {response.status_code}, ID: {data.get('id', 'N/A')}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            self.log_result("POST /api/contact - Valid Payload", passed, details)
            return passed, response.json() if response.status_code == 200 else None
        except Exception as e:
            self.log_result("POST /api/contact - Valid Payload", False, f"Error: {str(e)}")
            return False, None

    def test_create_contact_short_name(self):
        """Test POST /api/contact with short name (<2 chars)"""
        try:
            payload = {
                "name": "A",
                "phone": "9903830332",
                "email": "test@example.com",
                "service_interest": "FTL",
                "message": "This is a test message",
                "language": "en"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            passed = response.status_code == 422
            details = f"Status: {response.status_code}, Expected: 422"
            self.log_result("POST /api/contact - Short Name Validation", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Short Name Validation", False, f"Error: {str(e)}")
            return False

    def test_create_contact_invalid_phone_letters(self):
        """Test POST /api/contact with invalid phone (contains letters)"""
        try:
            payload = {
                "name": "Test User",
                "phone": "abc123",
                "email": "test@example.com",
                "service_interest": "FTL",
                "message": "This is a test message",
                "language": "en"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            passed = response.status_code == 422
            details = f"Status: {response.status_code}, Expected: 422"
            self.log_result("POST /api/contact - Invalid Phone (Letters)", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Invalid Phone (Letters)", False, f"Error: {str(e)}")
            return False

    def test_create_contact_invalid_phone_short(self):
        """Test POST /api/contact with invalid phone (too short)"""
        try:
            payload = {
                "name": "Test User",
                "phone": "123",
                "email": "test@example.com",
                "service_interest": "FTL",
                "message": "This is a test message",
                "language": "en"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            passed = response.status_code == 422
            details = f"Status: {response.status_code}, Expected: 422"
            self.log_result("POST /api/contact - Invalid Phone (Too Short)", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Invalid Phone (Too Short)", False, f"Error: {str(e)}")
            return False

    def test_create_contact_invalid_email(self):
        """Test POST /api/contact with invalid email format"""
        try:
            payload = {
                "name": "Test User",
                "phone": "9903830332",
                "email": "invalid-email",
                "service_interest": "FTL",
                "message": "This is a test message",
                "language": "en"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            passed = response.status_code == 422
            details = f"Status: {response.status_code}, Expected: 422"
            self.log_result("POST /api/contact - Invalid Email Format", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Invalid Email Format", False, f"Error: {str(e)}")
            return False

    def test_create_contact_invalid_service(self):
        """Test POST /api/contact with invalid service_interest value"""
        try:
            payload = {
                "name": "Test User",
                "phone": "9903830332",
                "email": "test@example.com",
                "service_interest": "InvalidService",
                "message": "This is a test message",
                "language": "en"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            passed = response.status_code == 422
            details = f"Status: {response.status_code}, Expected: 422"
            self.log_result("POST /api/contact - Invalid Service Interest", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Invalid Service Interest", False, f"Error: {str(e)}")
            return False

    def test_create_contact_short_message(self):
        """Test POST /api/contact with short message (<5 chars)"""
        try:
            payload = {
                "name": "Test User",
                "phone": "9903830332",
                "email": "test@example.com",
                "service_interest": "FTL",
                "message": "Hi",
                "language": "en"
            }
            response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
            passed = response.status_code == 422
            details = f"Status: {response.status_code}, Expected: 422"
            self.log_result("POST /api/contact - Short Message Validation", passed, details)
            return passed
        except Exception as e:
            self.log_result("POST /api/contact - Short Message Validation", False, f"Error: {str(e)}")
            return False

    def test_get_contacts(self):
        """Test GET /api/contacts - should return list sorted newest first"""
        try:
            # First create two contacts with slight delay to test sorting
            contact1_payload = {
                "name": "First Contact",
                "phone": "9903830331",
                "email": "first@example.com",
                "service_interest": "Part Load",
                "message": "First contact message",
                "language": "en"
            }
            contact2_payload = {
                "name": "Second Contact",
                "phone": "9903830332",
                "email": "second@example.com",
                "service_interest": "Express",
                "message": "Second contact message",
                "language": "en"
            }
            
            requests.post(f"{self.api_url}/contact", json=contact1_payload, timeout=10)
            time.sleep(0.5)  # Small delay to ensure different timestamps
            requests.post(f"{self.api_url}/contact", json=contact2_payload, timeout=10)
            
            # Now get the contacts
            response = requests.get(f"{self.api_url}/contacts", timeout=10)
            passed = response.status_code == 200
            
            if passed:
                data = response.json()
                is_list = isinstance(data, list)
                has_contacts = len(data) >= 2
                
                # Check if sorted newest first (first item should be "Second Contact")
                if has_contacts and len(data) >= 2:
                    # The most recent should be at index 0
                    first_item = data[0]
                    is_sorted = first_item.get("name") == "Second Contact"
                    passed = is_list and has_contacts and is_sorted
                    details = f"Status: {response.status_code}, Count: {len(data)}, First: {first_item.get('name')}, Sorted: {is_sorted}"
                else:
                    passed = is_list and has_contacts
                    details = f"Status: {response.status_code}, Count: {len(data)}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            
            self.log_result("GET /api/contacts - List & Sort", passed, details)
            return passed
        except Exception as e:
            self.log_result("GET /api/contacts - List & Sort", False, f"Error: {str(e)}")
            return False

    def test_all_service_options(self):
        """Test all valid service_interest options"""
        service_options = ["FTL", "Part Load", "Express", "Vendor Partnership", "Other"]
        all_passed = True
        
        for service in service_options:
            try:
                payload = {
                    "name": f"Test {service}",
                    "phone": "9903830332",
                    "email": "test@example.com",
                    "service_interest": service,
                    "message": f"Testing {service} service",
                    "language": "en"
                }
                response = requests.post(f"{self.api_url}/contact", json=payload, timeout=10)
                passed = response.status_code == 200
                if not passed:
                    all_passed = False
                details = f"Service: {service}, Status: {response.status_code}"
                self.log_result(f"POST /api/contact - Service Option '{service}'", passed, details)
            except Exception as e:
                all_passed = False
                self.log_result(f"POST /api/contact - Service Option '{service}'", False, f"Error: {str(e)}")
        
        return all_passed

    def run_all_tests(self):
        """Run all backend tests"""
        print("\n" + "="*70)
        print("DAHMI LOGISTICS BACKEND API TESTS")
        print("="*70 + "\n")
        
        # Test API health first
        if not self.test_api_health():
            print("\n❌ API is not responding. Stopping tests.")
            return False
        
        print("\n--- Testing POST /api/contact Endpoint ---\n")
        
        # Test valid contact creation
        self.test_create_contact_valid()
        
        # Test all service options
        self.test_all_service_options()
        
        # Test validation
        print("\n--- Testing Validation ---\n")
        self.test_create_contact_short_name()
        self.test_create_contact_invalid_phone_letters()
        self.test_create_contact_invalid_phone_short()
        self.test_create_contact_invalid_email()
        self.test_create_contact_invalid_service()
        self.test_create_contact_short_message()
        
        # Test GET endpoint
        print("\n--- Testing GET /api/contacts Endpoint ---\n")
        self.test_get_contacts()
        
        # Print summary
        print("\n" + "="*70)
        print(f"TESTS COMPLETED: {self.tests_passed}/{self.tests_run} PASSED")
        print("="*70 + "\n")
        
        return self.tests_passed == self.tests_run

def main():
    tester = DahmiLogisticsAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
