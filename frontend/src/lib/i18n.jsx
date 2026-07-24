import { createContext, useContext, useEffect, useState } from "react";

export const CONTACT_PHONE = "+91 8981930011";
export const CONTACT_PHONE_TEL = "+918981930011";
export const CONTACT_EMAIL = "dahmilogistics@gmail.com";
export const CONTACT_WEBSITE = "www.dahmilogistics.com";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      fleet: "Fleet",
      network: "Network",
      careers: "Careers",
      contact: "Contact",
    },
    common: {
      callNow: "Call Now",
      contactUs: "Contact Us",
      learnMore: "Learn More",
      exploreFleet: "Explore Our Fleet",
      viewNetwork: "View Our Network",
      getQuoteHint: "Talk to our team for the best freight rates",
    },
    hero: {
      badge: "On Time Every Time",
      title1: "Delivering Trust,",
      title2: "Driving Growth",
      subtitle:
        "Reliable logistics solutions across India — Full Truck Load, Part Load & Express services backed by a Pan-India network and a wide range of vehicles.",
      imageAlt: "Dahmi Logistics truck on Indian highway",
      card1Title: "Pan India Network",
      card2Title: "Safe & Secure",
      card2Sub: "Your cargo, our responsibility",
    },
    stats: [
      { value: "28", label: "States in Network" },
      { value: "5", label: "Fleet Categories" },
      { value: "24x7", label: "Dedicated Support" },
      { value: "Pan India", label: "Coverage" },
    ],
    about: {
      kicker: "About Us",
      title: "Dahmi Logistics — On Time Every Time",
      body1:
        "Dahmi Logistics is a trusted road transport and logistics partner delivering cargo reliably across India. From Full Truck Load and Part Load to Express services, we move goods for businesses of every size with safety, transparency and speed.",
      body2:
        "With branches in Kolkata, Durgapur and Haldia, and satellite branches across Gauhati, Ranchi, Bhubaneswar, Mumbai and Surat, our network keeps your supply chain moving — on time, every time.",
      points: [
        "FTL, Part Load & Express services",
        "Wide range of vehicles for every cargo type",
        "Single point of contact for all logistics needs",
        "Transparent pricing and clear communication",
      ],
      imageAlt: "Cargo operations at Dahmi Logistics",
    },
    founder: {
      kicker: "Leadership",
      title: "Meet Our Founder",
      name: "Lalit Khemka",
      role: "Founder & Proprietor, Dahmi Logistics",
      badges: ["Founded 2024", "Ex-Reliance Logistics"],
      bio: "Lalit Khemka is the Founder and Proprietor of Dahmi Logistics, established in 2024 with a vision to deliver dependable and customer-focused logistics solutions. A former Sales Manager at Reliance Logistics, he brings extensive experience in both marketing and traffic management. Driven by a passion for excellence, he is committed to building a trusted logistics brand that prioritizes customer satisfaction, operational efficiency, and long-term relationships through reliable, on-time transportation services.",
      photoAlt: "Lalit Khemka, Founder of Dahmi Logistics",
    },
    shippers: {
      kicker: "For Shippers",
      title: "Logistics that keeps your business moving",
      subtitle:
        "Everything a shipper needs — reliability, coverage, visibility and value, with a dedicated team behind every consignment.",
      items: [
        {
          title: "Timely & Reliable Deliveries",
          desc: "On time, every time. We plan every route and load to hit your delivery windows.",
        },
        {
          title: "Pan India Coverage",
          desc: "FTL, Part Load & Express services connecting major industrial and commercial hubs.",
        },
        {
          title: "Real Time Tracking",
          desc: "Complete visibility of your cargo throughout its journey.",
        },
        {
          title: "Best Price Assurance",
          desc: "Competitive rates and maximum value on every shipment.",
        },
        {
          title: "Dedicated Support",
          desc: "A single point of contact for all your logistics needs.",
        },
      ],
    },
    commitment: {
      kicker: "Our Commitment",
      title: "Your Cargo, Our Responsibility",
      subtitle:
        "Four pillars guide every kilometre we cover and every consignment we carry.",
      pillars: [
        {
          title: "Safety",
          desc: "Trained drivers, secure loading practices and careful handling at every step.",
        },
        {
          title: "Reliability",
          desc: "Consistent, dependable service your business can plan around.",
        },
        {
          title: "Transparency",
          desc: "Fair process, honest pricing and clear communication throughout.",
        },
        {
          title: "Timely Delivery",
          desc: "Deadlines matter. We deliver on time, every time.",
        },
      ],
    },
    partners: {
      kicker: "For Vendors & Transport Partners",
      title: "Grow with us, succeed with us",
      subtitle:
        "Join the Dahmi Logistics partner network and get consistent business with fast, fair and transparent dealings.",
      items: [
        {
          title: "Regular Business Opportunities",
          desc: "Consistent loads across our All India network keep your vehicles earning.",
        },
        {
          title: "Fast Payments",
          desc: "Timely and hassle-free settlements — no chasing, no delays.",
        },
        {
          title: "Transparent Dealings",
          desc: "Fair process and clear communication in every transaction.",
        },
        {
          title: "Digital & Easy Process",
          desc: "Quick assignments with less paperwork.",
        },
        {
          title: "Long Term Partnerships",
          desc: "We build relationships that grow with you.",
        },
      ],
      cta: "Partner With Us",
    },
    fleet: {
      kicker: "Our Fleet",
      title: "A wide range of vehicles for every load",
      subtitle:
        "From light commercial vehicles to trailers — the right vehicle for your cargo, every time.",
      items: [
        {
          code: "FTL",
          name: "Full Truck Load",
          desc: "Dedicated trucks for bulk movement of your cargo anywhere in India.",
        },
        {
          code: "LCV",
          name: "Light Commercial Vehicle",
          desc: "Agile vehicles for smaller consignments and city distribution.",
        },
        {
          code: "OPEN",
          name: "Open Body Trucks",
          desc: "Flexible open body trucks for oversized and general cargo.",
        },
        {
          code: "CONTAINER",
          name: "Container Trucks",
          desc: "Sealed container vehicles for high-value and weather-sensitive goods.",
        },
        {
          code: "TRAILER",
          name: "Trailer Services",
          desc: "Heavy-duty trailers for machinery, project and heavy haul cargo.",
        },
      ],
    },
    valueProps: [
      "Pan India Network",
      "Wide Range of Vehicles",
      "On Time Every Time",
      "Safe & Secure Deliveries",
      "Strong Partnership, Lasting Growth",
    ],
    network: {
      kicker: "Our Network",
      title: "Branches across India",
      subtitle:
        "Strategically located branches and satellite offices keep your cargo moving across the country.",
      branchesLabel: "Branches",
      satelliteLabel: "Satellite Branches",
      branches: ["Kolkata", "Durgapur", "Haldia"],
      satellite: ["Gauhati", "Ranchi", "Bhubaneswar", "Mumbai", "Surat"],
      legendMain: "Main Branch",
      legendSatellite: "Satellite",
      hqLabel: "Headquarters",
      mapHint: "Hover or tap a branch to trace its route",
    },
    ctaBanner: {
      title: "Let's Move Together",
      subtitle: "Connect | Collaborate | Grow",
      body: "Ready to ship or partner with us? Our team is one call away.",
    },
    contact: {
      kicker: "Contact Us",
      title: "Get in touch with our team",
      subtitle:
        "Tell us about your shipment or partnership enquiry — we respond quickly.",
      form: {
        name: "Full Name",
        namePlaceholder: "Your name",
        phone: "Phone Number",
        phonePlaceholder: "e.g. 8981930011",
        email: "Email (optional)",
        emailPlaceholder: "you@company.com",
        service: "Service Interest",
        servicePlaceholder: "Select a service",
        serviceOptions: [
          { value: "FTL", label: "Full Truck Load (FTL)" },
          { value: "Part Load", label: "Part Load" },
          { value: "Express", label: "Express" },
          { value: "Vendor Partnership", label: "Vendor / Transport Partnership" },
          { value: "Other", label: "Other" },
        ],
        message: "Message",
        messagePlaceholder: "Tell us about your requirement...",
        submit: "Send Message",
        submitting: "Sending...",
        successTitle: "Message sent successfully!",
        successDesc: "Our team will get back to you shortly.",
        errorTitle: "Could not send message",
        errorDesc: "Please try again or call us directly.",
        errors: {
          name: "Please enter your name (min 2 characters)",
          phone: "Please enter a valid phone number (7-15 digits)",
          email: "Please enter a valid email address",
          service: "Please select a service",
          message: "Please enter a message (min 5 characters)",
        },
      },
      details: {
        title: "Reach us directly",
        phoneLabel: "Phone",
        emailLabel: "Email",
        websiteLabel: "Website",
        branchesLabel: "Branches",
        hoursLabel: "Support",
        hours: "24x7 — Always available for your cargo",
      },
    },
    careers: {
      kicker: "Careers",
      title: "Build your career on the road with us",
      subtitle:
        "Join a growing Pan-India logistics team that values safety, honesty and hard work. Grow with us, succeed with us.",
      perksTitle: "Why work with Dahmi Logistics",
      perks: [
        {
          title: "Growth & Learning",
          desc: "Grow your skills with a fast-expanding Pan-India logistics network.",
        },
        {
          title: "Supportive Team",
          desc: "Work with people who respect, guide and support each other.",
        },
        {
          title: "Fair & Timely Pay",
          desc: "Transparent, on-time salaries and settlements — always.",
        },
        {
          title: "Pan-India Exposure",
          desc: "Gain experience across operations in 8+ cities of India.",
        },
      ],
      rolesTitle: "Teams you can join",
      roles: [
        {
          code: "drivers",
          title: "Drivers & Fleet Staff",
          desc: "Professional drivers and fleet support for FTL, container and trailer operations.",
        },
        {
          code: "operations",
          title: "Operations & Dispatch",
          desc: "Plan routes, manage loads and keep cargo moving on time, every time.",
        },
        {
          code: "sales",
          title: "Sales & Business Development",
          desc: "Build lasting shipper and vendor relationships across India.",
        },
        {
          code: "accounts",
          title: "Accounts & Admin",
          desc: "Keep payments fast, records clean and processes transparent.",
        },
      ],
      form: {
        title: "Apply Now",
        subtitle: "Share your details and our team will reach out to you.",
        name: "Full Name",
        namePlaceholder: "Your name",
        phone: "Phone Number",
        phonePlaceholder: "e.g. 8981930011",
        email: "Email (optional)",
        emailPlaceholder: "you@example.com",
        position: "Position",
        positionPlaceholder: "Select a position",
        positionOptions: [
          { value: "drivers", label: "Drivers & Fleet Staff" },
          { value: "operations", label: "Operations & Dispatch" },
          { value: "sales", label: "Sales & Business Development" },
          { value: "accounts", label: "Accounts & Admin" },
          { value: "other", label: "Other" },
        ],
        experience: "Experience (optional)",
        experiencePlaceholder: "e.g. 3 years",
        message: "Why do you want to join?",
        messagePlaceholder: "Tell us briefly about yourself...",
        resume: "Resume / CV (optional)",
        resumeHint: "PDF or Word, max 5MB",
        resumeChoose: "Choose file",
        resumeChange: "Change file",
        resumeRemove: "Remove",
        submit: "Submit Application",
        submitting: "Submitting...",
        successTitle: "Application submitted!",
        successDesc: "Our team will review it and contact you soon.",
        errorTitle: "Could not submit application",
        errorDesc: "Please try again or call us directly.",
        errors: {
          name: "Please enter your name (min 2 characters)",
          phone: "Please enter a valid phone number (7-15 digits)",
          email: "Please enter a valid email address",
          position: "Please select a position",
          message: "Please write a short message (min 5 characters)",
          resumeType: "Resume must be a PDF or Word document (.pdf, .doc, .docx)",
          resumeSize: "Resume must be under 5MB",
        },
      },
    },
    footer: {
      blurb:
        "Reliable logistics solutions across India. FTL, Part Load & Express services — on time, every time.",
      quickLinks: "Quick Links",
      services: "Services",
      servicesList: [
        "Full Truck Load (FTL)",
        "Part Load",
        "Express Services",
        "Container Trucks",
        "Trailer Services",
      ],
      contact: "Contact",
      tagline: "Let's Move Together — Connect | Collaborate | Grow",
      rights: "All rights reserved.",
    },
  },
  hi: {
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      services: "सेवाएं",
      fleet: "फ्लीट",
      network: "नेटवर्क",
      careers: "करियर",
      contact: "संपर्क करें",
    },
    common: {
      callNow: "अभी कॉल करें",
      contactUs: "संपर्क करें",
      learnMore: "और जानें",
      exploreFleet: "हमारा फ्लीट देखें",
      viewNetwork: "हमारा नेटवर्क देखें",
      getQuoteHint: "सर्वोत्तम माल भाड़ा दरों के लिए हमारी टीम से बात करें",
    },
    hero: {
      badge: "हर बार, समय पर",
      title1: "विश्वास की डिलीवरी,",
      title2: "विकास की रफ़्तार",
      subtitle:
        "पूरे भारत में विश्वसनीय लॉजिस्टिक्स समाधान — फुल ट्रक लोड, पार्ट लोड और एक्सप्रेस सेवाएं, पैन-इंडिया नेटवर्क और विभिन्न प्रकार के वाहनों के साथ।",
      imageAlt: "भारतीय राजमार्ग पर दाहमी लॉजिस्टिक्स ट्रक",
      card1Title: "पैन इंडिया नेटवर्क",
      card2Title: "सुरक्षित और भरोसेमंद",
      card2Sub: "आपका कार्गो, हमारी ज़िम्मेदारी",
    },
    stats: [
      { value: "28", label: "नेटवर्क में राज्य" },
      { value: "5", label: "फ्लीट श्रेणियां" },
      { value: "24x7", label: "समर्पित सहायता" },
      { value: "पैन इंडिया", label: "कवरेज" },
    ],
    about: {
      kicker: "हमारे बारे में",
      title: "दाहमी लॉजिस्टिक्स — हर बार, समय पर",
      body1:
        "दाहमी लॉजिस्टिक्स एक विश्वसनीय सड़क परिवहन और लॉजिस्टिक्स पार्टनर है जो पूरे भारत में कार्गो की भरोसेमंद डिलीवरी करता है। फुल ट्रक लोड और पार्ट लोड से लेकर एक्सप्रेस सेवाओं तक, हम हर आकार के व्यवसायों का सामान सुरक्षा, पारदर्शिता और तेज़ी से पहुंचाते हैं।",
      body2:
        "कोलकाता, दुर्गापुर और हल्दिया में शाखाओं तथा गुवाहाटी, रांची, भुवनेश्वर, मुंबई और सूरत में सैटेलाइट शाखाओं के साथ, हमारा नेटवर्क आपकी सप्लाई चेन को चालू रखता है — हर बार, समय पर।",
      points: [
        "FTL, पार्ट लोड और एक्सप्रेस सेवाएं",
        "हर प्रकार के कार्गो के लिए विभिन्न वाहन",
        "सभी लॉजिस्टिक्स ज़रूरतों के लिए एक ही संपर्क बिंदु",
        "पारदर्शी मूल्य और स्पष्ट संवाद",
      ],
      imageAlt: "दाहमी लॉजिस्टिक्स में कार्गो संचालन",
    },
    founder: {
      kicker: "नेतृत्व",
      title: "हमारे संस्थापक से मिलें",
      name: "ललित खेमका",
      role: "संस्थापक और प्रोपराइटर, दाहमी लॉजिस्टिक्स",
      badges: ["स्थापना 2024", "पूर्व रिलायंस लॉजिस्टिक्स"],
      bio: "ललित खेमका दाहमी लॉजिस्टिक्स के संस्थापक और प्रोपराइटर हैं, जिसकी स्थापना 2024 में विश्वसनीय और ग्राहक-केंद्रित लॉजिस्टिक्स समाधान प्रदान करने के दृष्टिकोण के साथ की गई थी। रिलायंस लॉजिस्टिक्स में पूर्व सेल्स मैनेजर के रूप में, वे मार्केटिंग और ट्रैफिक मैनेजमेंट दोनों में व्यापक अनुभव रखते हैं। उत्कृष्टता के प्रति जुनून से प्रेरित होकर, वे एक भरोसेमंद लॉजिस्टिक्स ब्रांड बनाने के लिए प्रतिबद्ध हैं जो विश्वसनीय, समय पर परिवहन सेवाओं के माध्यम से ग्राहक संतुष्टि, परिचालन दक्षता और दीर्घकालिक संबंधों को प्राथमिकता देता है।",
      photoAlt: "ललित खेमका, दाहमी लॉजिस्टिक्स के संस्थापक",
    },
    shippers: {
      kicker: "शिपर्स के लिए",
      title: "लॉजिस्टिक्स जो आपके व्यवसाय को चालू रखे",
      subtitle:
        "शिपर की हर ज़रूरत — विश्वसनीयता, कवरेज, विज़िबिलिटी और वैल्यू, हर कंसाइनमेंट के पीछे एक समर्पित टीम के साथ।",
      items: [
        {
          title: "समय पर और विश्वसनीय डिलीवरी",
          desc: "हर बार, समय पर। हम हर रूट और लोड की योजना आपकी डिलीवरी समय-सीमा के अनुसार बनाते हैं।",
        },
        {
          title: "पूरे भारत में कवरेज",
          desc: "FTL, पार्ट लोड और एक्सप्रेस सेवाएं प्रमुख औद्योगिक और व्यावसायिक केंद्रों को जोड़ती हैं।",
        },
        {
          title: "रीयल टाइम ट्रैकिंग",
          desc: "पूरी यात्रा के दौरान आपके कार्गो की पूर्ण विज़िबिलिटी।",
        },
        {
          title: "सर्वोत्तम मूल्य की गारंटी",
          desc: "हर शिपमेंट पर प्रतिस्पर्धी दरें और अधिकतम वैल्यू।",
        },
        {
          title: "समर्पित सहायता",
          desc: "आपकी सभी लॉजिस्टिक्स ज़रूरतों के लिए एक ही संपर्क बिंदु।",
        },
      ],
    },
    commitment: {
      kicker: "हमारी प्रतिबद्धता",
      title: "आपका कार्गो, हमारी ज़िम्मेदारी",
      subtitle:
        "हर किलोमीटर और हर कंसाइनमेंट में चार स्तंभ हमारा मार्गदर्शन करते हैं।",
      pillars: [
        {
          title: "सुरक्षा",
          desc: "प्रशिक्षित ड्राइवर, सुरक्षित लोडिंग और हर कदम पर सावधानीपूर्वक हैंडलिंग।",
        },
        {
          title: "विश्वसनीयता",
          desc: "लगातार, भरोसेमंद सेवा जिस पर आपका व्यवसाय योजना बना सके।",
        },
        {
          title: "पारदर्शिता",
          desc: "निष्पक्ष प्रक्रिया, ईमानदार मूल्य और स्पष्ट संवाद।",
        },
        {
          title: "समय पर डिलीवरी",
          desc: "समय-सीमा मायने रखती है। हम हर बार समय पर डिलीवर करते हैं।",
        },
      ],
    },
    partners: {
      kicker: "वेंडर्स और ट्रांसपोर्ट पार्टनर्स के लिए",
      title: "हमारे साथ बढ़ें, हमारे साथ सफल हों",
      subtitle:
        "दाहमी लॉजिस्टिक्स पार्टनर नेटवर्क से जुड़ें और तेज़, निष्पक्ष व पारदर्शी लेन-देन के साथ नियमित व्यवसाय पाएं।",
      items: [
        {
          title: "नियमित व्यापार के अवसर",
          desc: "हमारे अखिल भारतीय नेटवर्क में लगातार लोड आपके वाहनों की कमाई बनाए रखते हैं।",
        },
        {
          title: "तेज़ भुगतान",
          desc: "समय पर और परेशानी-मुक्त सेटलमेंट — न कोई इंतज़ार, न कोई देरी।",
        },
        {
          title: "पारदर्शी लेन-देन",
          desc: "हर लेन-देन में निष्पक्ष प्रक्रिया और स्पष्ट संवाद।",
        },
        {
          title: "डिजिटल और आसान प्रक्रिया",
          desc: "कम कागज़ी कार्रवाई के साथ त्वरित असाइनमेंट।",
        },
        {
          title: "दीर्घकालिक साझेदारी",
          desc: "हम ऐसे रिश्ते बनाते हैं जो आपके साथ बढ़ते हैं।",
        },
      ],
      cta: "हमारे पार्टनर बनें",
    },
    fleet: {
      kicker: "हमारा फ्लीट",
      title: "हर लोड के लिए विभिन्न प्रकार के वाहन",
      subtitle:
        "लाइट कमर्शियल वाहनों से लेकर ट्रेलर तक — आपके कार्गो के लिए सही वाहन, हर बार।",
      items: [
        {
          code: "FTL",
          name: "फुल ट्रक लोड",
          desc: "भारत में कहीं भी आपके कार्गो की बल्क मूवमेंट के लिए समर्पित ट्रक।",
        },
        {
          code: "LCV",
          name: "लाइट कमर्शियल व्हीकल",
          desc: "छोटे कंसाइनमेंट और शहरी वितरण के लिए फुर्तीले वाहन।",
        },
        {
          code: "OPEN",
          name: "ओपन बॉडी ट्रक",
          desc: "बड़े आकार और सामान्य कार्गो के लिए लचीले ओपन बॉडी ट्रक।",
        },
        {
          code: "CONTAINER",
          name: "कंटेनर ट्रक",
          desc: "उच्च-मूल्य और मौसम-संवेदनशील सामान के लिए सीलबंद कंटेनर वाहन।",
        },
        {
          code: "TRAILER",
          name: "ट्रेलर सेवाएं",
          desc: "मशीनरी, प्रोजेक्ट और भारी कार्गो के लिए हैवी-ड्यूटी ट्रेलर।",
        },
      ],
    },
    valueProps: [
      "पैन इंडिया नेटवर्क",
      "विभिन्न प्रकार के वाहन",
      "हर बार, समय पर",
      "सुरक्षित डिलीवरी",
      "मज़बूत साझेदारी, स्थायी विकास",
    ],
    network: {
      kicker: "हमारा नेटवर्क",
      title: "पूरे भारत में शाखाएं",
      subtitle:
        "रणनीतिक रूप से स्थित शाखाएं और सैटेलाइट कार्यालय आपके कार्गो को देश भर में चालू रखते हैं।",
      branchesLabel: "शाखाएं",
      satelliteLabel: "सैटेलाइट शाखाएं",
      branches: ["कोलकाता", "दुर्गापुर", "हल्दिया"],
      satellite: ["गुवाहाटी", "रांची", "भुवनेश्वर", "मुंबई", "सूरत"],
      legendMain: "मुख्य शाखा",
      legendSatellite: "सैटेलाइट",
      hqLabel: "मुख्यालय",
      mapHint: "मार्ग देखने के लिए किसी शाखा को होवर या टैप करें",
    },
    ctaBanner: {
      title: "आइए साथ मिलकर आगे बढ़ें",
      subtitle: "जुड़ें | सहयोग करें | बढ़ें",
      body: "शिपमेंट या साझेदारी के लिए तैयार हैं? हमारी टीम बस एक कॉल दूर है।",
    },
    contact: {
      kicker: "संपर्क करें",
      title: "हमारी टीम से संपर्क करें",
      subtitle:
        "अपने शिपमेंट या साझेदारी संबंधी पूछताछ के बारे में बताएं — हम तुरंत जवाब देते हैं।",
      form: {
        name: "पूरा नाम",
        namePlaceholder: "आपका नाम",
        phone: "फोन नंबर",
        phonePlaceholder: "जैसे 8981930011",
        email: "ईमेल (वैकल्पिक)",
        emailPlaceholder: "you@company.com",
        service: "सेवा में रुचि",
        servicePlaceholder: "सेवा चुनें",
        serviceOptions: [
          { value: "FTL", label: "फुल ट्रक लोड (FTL)" },
          { value: "Part Load", label: "पार्ट लोड" },
          { value: "Express", label: "एक्सप्रेस" },
          { value: "Vendor Partnership", label: "वेंडर / ट्रांसपोर्ट साझेदारी" },
          { value: "Other", label: "अन्य" },
        ],
        message: "संदेश",
        messagePlaceholder: "अपनी आवश्यकता के बारे में बताएं...",
        submit: "संदेश भेजें",
        submitting: "भेजा जा रहा है...",
        successTitle: "संदेश सफलतापूर्वक भेजा गया!",
        successDesc: "हमारी टीम जल्द ही आपसे संपर्क करेगी।",
        errorTitle: "संदेश नहीं भेजा जा सका",
        errorDesc: "कृपया पुनः प्रयास करें या हमें सीधे कॉल करें।",
        errors: {
          name: "कृपया अपना नाम दर्ज करें (कम से कम 2 अक्षर)",
          phone: "कृपया मान्य फोन नंबर दर्ज करें (7-15 अंक)",
          email: "कृपया मान्य ईमेल पता दर्ज करें",
          service: "कृपया एक सेवा चुनें",
          message: "कृपया संदेश दर्ज करें (कम से कम 5 अक्षर)",
        },
      },
      details: {
        title: "सीधे संपर्क करें",
        phoneLabel: "फोन",
        emailLabel: "ईमेल",
        websiteLabel: "वेबसाइट",
        branchesLabel: "शाखाएं",
        hoursLabel: "सहायता",
        hours: "24x7 — आपके कार्गो के लिए हमेशा उपलब्ध",
      },
    },
    careers: {
      kicker: "करियर",
      title: "हमारे साथ अपना करियर बनाएं",
      subtitle:
        "एक बढ़ती हुई पैन-इंडिया लॉजिस्टिक्स टीम से जुड़ें जो सुरक्षा, ईमानदारी और मेहनत को महत्व देती है। हमारे साथ बढ़ें, हमारे साथ सफल हों।",
      perksTitle: "दाहमी लॉजिस्टिक्स के साथ काम क्यों करें",
      perks: [
        {
          title: "विकास और सीखना",
          desc: "तेज़ी से बढ़ते पैन-इंडिया लॉजिस्टिक्स नेटवर्क के साथ अपने कौशल बढ़ाएं।",
        },
        {
          title: "सहयोगी टीम",
          desc: "ऐसे लोगों के साथ काम करें जो एक-दूसरे का सम्मान और सहयोग करते हैं।",
        },
        {
          title: "उचित और समय पर वेतन",
          desc: "पारदर्शी, समय पर वेतन और सेटलमेंट — हमेशा।",
        },
        {
          title: "पैन-इंडिया अनुभव",
          desc: "भारत के 8+ शहरों में संचालन का अनुभव प्राप्त करें।",
        },
      ],
      rolesTitle: "आप किन टीमों से जुड़ सकते हैं",
      roles: [
        {
          code: "drivers",
          title: "ड्राइवर और फ्लीट स्टाफ",
          desc: "FTL, कंटेनर और ट्रेलर संचालन के लिए पेशेवर ड्राइवर और फ्लीट सहायता।",
        },
        {
          code: "operations",
          title: "ऑपरेशन्स और डिस्पैच",
          desc: "रूट की योजना बनाएं, लोड प्रबंधित करें और कार्गो को समय पर चलाते रहें।",
        },
        {
          code: "sales",
          title: "सेल्स और बिज़नेस डेवलपमेंट",
          desc: "पूरे भारत में शिपर और वेंडर संबंध बनाएं।",
        },
        {
          code: "accounts",
          title: "अकाउंट्स और एडमिन",
          desc: "भुगतान तेज़, रिकॉर्ड साफ और प्रक्रियाएं पारदर्शी रखें।",
        },
      ],
      form: {
        title: "अभी आवेदन करें",
        subtitle: "अपना विवरण साझा करें और हमारी टीम आपसे संपर्क करेगी।",
        name: "पूरा नाम",
        namePlaceholder: "आपका नाम",
        phone: "फोन नंबर",
        phonePlaceholder: "जैसे 8981930011",
        email: "ईमेल (वैकल्पिक)",
        emailPlaceholder: "you@example.com",
        position: "पद",
        positionPlaceholder: "पद चुनें",
        positionOptions: [
          { value: "drivers", label: "ड्राइवर और फ्लीट स्टाफ" },
          { value: "operations", label: "ऑपरेशन्स और डिस्पैच" },
          { value: "sales", label: "सेल्स और बिज़नेस डेवलपमेंट" },
          { value: "accounts", label: "अकाउंट्स और एडमिन" },
          { value: "other", label: "अन्य" },
        ],
        experience: "अनुभव (वैकल्पिक)",
        experiencePlaceholder: "जैसे 3 साल",
        message: "आप क्यों जुड़ना चाहते हैं?",
        messagePlaceholder: "अपने बारे में संक्षेप में बताएं...",
        resume: "रिज़्यूमे / सीवी (वैकल्पिक)",
        resumeHint: "PDF या Word, अधिकतम 5MB",
        resumeChoose: "फ़ाइल चुनें",
        resumeChange: "फ़ाइल बदलें",
        resumeRemove: "हटाएं",
        submit: "आवेदन जमा करें",
        submitting: "जमा किया जा रहा है...",
        successTitle: "आवेदन जमा हो गया!",
        successDesc: "हमारी टीम इसकी समीक्षा कर जल्द ही आपसे संपर्क करेगी।",
        errorTitle: "आवेदन जमा नहीं हो सका",
        errorDesc: "कृपया पुनः प्रयास करें या हमें सीधे कॉल करें।",
        errors: {
          name: "कृपया अपना नाम दर्ज करें (कम से कम 2 अक्षर)",
          phone: "कृपया मान्य फोन नंबर दर्ज करें (7-15 अंक)",
          email: "कृपया मान्य ईमेल पता दर्ज करें",
          position: "कृपया एक पद चुनें",
          message: "कृपया संक्षिप्त संदेश लिखें (कम से कम 5 अक्षर)",
          resumeType: "रिज़्यूमे PDF या Word दस्तावेज़ होना चाहिए (.pdf, .doc, .docx)",
          resumeSize: "रिज़्यूमे 5MB से कम होना चाहिए",
        },
      },
    },
    footer: {
      blurb:
        "पूरे भारत में विश्वसनीय लॉजिस्टिक्स समाधान। FTL, पार्ट लोड और एक्सप्रेस सेवाएं — हर बार, समय पर।",
      quickLinks: "त्वरित लिंक",
      services: "सेवाएं",
      servicesList: [
        "फुल ट्रक लोड (FTL)",
        "पार्ट लोड",
        "एक्सप्रेस सेवाएं",
        "कंटेनर ट्रक",
        "ट्रेलर सेवाएं",
      ],
      contact: "संपर्क",
      tagline: "आइए साथ मिलकर आगे बढ़ें — जुड़ें | सहयोग करें | बढ़ें",
      rights: "सर्वाधिकार सुरक्षित।",
    },
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem("dahmi-lang");
      return stored === "hi" ? "hi" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("dahmi-lang", lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const setLang = (l) => setLangState(l === "hi" ? "hi" : "en");
  const toggleLang = () => setLangState((prev) => (prev === "en" ? "hi" : "en"));

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
