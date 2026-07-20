import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLang } from "@/lib/i18n";

export const SITE_URL = "https://www.dahmilogistics.com";

const pageMeta = {
  en: {
    "/": {
      title: "Dahmi Logistics | Reliable Logistics Solutions Across India",
      desc: "Dahmi Logistics — FTL, Part Load & Express road freight services across India. Pan-India network, wide range of vehicles, safe & secure deliveries. On Time Every Time.",
    },
    "/about": {
      title: "About Us | Dahmi Logistics",
      desc: "Learn about Dahmi Logistics — a trusted road transport partner with branches in Kolkata, Durgapur & Haldia and satellite offices across India. Safety, reliability, transparency and timely delivery.",
    },
    "/services": {
      title: "Logistics Services — FTL, Part Load & Express | Dahmi Logistics",
      desc: "Full Truck Load, Part Load and Express freight services for shippers, plus regular loads, fast payments and transparent dealings for vendors & transport partners.",
    },
    "/fleet": {
      title: "Our Fleet — FTL, LCV, Open Body, Container & Trailer | Dahmi Logistics",
      desc: "A wide range of vehicles for every load — Full Truck Load, Light Commercial Vehicles, Open Body Trucks, Container Trucks and Trailer services across India.",
    },
    "/network": {
      title: "Branch Network Across India | Dahmi Logistics",
      desc: "Dahmi Logistics branches in Kolkata, Durgapur & Haldia with satellite branches in Gauhati, Ranchi, Bhubaneswar, Mumbai and Surat — keeping your cargo moving Pan-India.",
    },
    "/careers": {
      title: "Careers — Join Our Team | Dahmi Logistics",
      desc: "Build your career with Dahmi Logistics. Openings for drivers, operations, sales and accounts across our growing Pan-India logistics network. Apply now.",
    },
    "/contact": {
      title: "Contact Us | Dahmi Logistics",
      desc: "Get in touch with Dahmi Logistics for FTL, Part Load, Express shipments or vendor partnerships. Call +91 9903830332 or send us a message — 24x7 support.",
    },
  },
  hi: {
    "/": {
      title: "दाहमी लॉजिस्टिक्स | पूरे भारत में विश्वसनीय लॉजिस्टिक्स समाधान",
      desc: "दाहमी लॉजिस्टिक्स — पूरे भारत में FTL, पार्ट लोड और एक्सप्रेस सड़क माल ढुलाई सेवाएं। पैन-इंडिया नेटवर्क, विभिन्न वाहन और सुरक्षित डिलीवरी। हर बार, समय पर।",
    },
    "/about": {
      title: "हमारे बारे में | दाहमी लॉजिस्टिक्स",
      desc: "दाहमी लॉजिस्टिक्स के बारे में जानें — कोलकाता, दुर्गापुर और हल्दिया में शाखाओं के साथ एक विश्वसनीय सड़क परिवहन पार्टनर।",
    },
    "/services": {
      title: "सेवाएं — FTL, पार्ट लोड और एक्सप्रेस | दाहमी लॉजिस्टिक्स",
      desc: "शिपर्स के लिए फुल ट्रक लोड, पार्ट लोड और एक्सप्रेस सेवाएं, तथा वेंडर्स के लिए नियमित लोड और तेज़ भुगतान।",
    },
    "/fleet": {
      title: "हमारा फ्लीट — FTL, LCV, कंटेनर और ट्रेलर | दाहमी लॉजिस्टिक्स",
      desc: "हर लोड के लिए विभिन्न वाहन — फुल ट्रक लोड, लाइट कमर्शियल व्हीकल, ओपन बॉडी ट्रक, कंटेनर ट्रक और ट्रेलर सेवाएं।",
    },
    "/network": {
      title: "पूरे भारत में शाखा नेटवर्क | दाहमी लॉजिस्टिक्स",
      desc: "कोलकाता, दुर्गापुर और हल्दिया में शाखाएं तथा गुवाहाटी, रांची, भुवनेश्वर, मुंबई और सूरत में सैटेलाइट शाखाएं।",
    },
    "/careers": {
      title: "करियर — हमारी टीम से जुड़ें | दाहमी लॉजिस्टिक्स",
      desc: "दाहमी लॉजिस्टिक्स के साथ अपना करियर बनाएं। ड्राइवर, ऑपरेशन्स, सेल्स और अकाउंट्स के लिए अवसर। अभी आवेदन करें।",
    },
    "/contact": {
      title: "संपर्क करें | दाहमी लॉजिस्टिक्स",
      desc: "FTL, पार्ट लोड, एक्सप्रेस शिपमेंट या वेंडर साझेदारी के लिए दाहमी लॉजिस्टिक्स से संपर्क करें। कॉल करें +91 9903830332 — 24x7 सहायता।",
    },
  },
};

const ensureTag = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMetaByName = (name, content) => {
  const el = ensureTag(`meta[name="${name}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("name", name);
    return m;
  });
  el.setAttribute("content", content);
};

const setMetaByProp = (prop, content) => {
  const el = ensureTag(`meta[property="${prop}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("property", prop);
    return m;
  });
  el.setAttribute("content", content);
};

export const PageMeta = () => {
  const { pathname } = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const dict = pageMeta[lang] || pageMeta.en;
    const meta = dict[pathname] || dict["/"];
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = meta.title;
    setMetaByName("description", meta.desc);

    // Canonical
    const canonical = ensureTag('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    canonical.setAttribute("href", canonicalUrl);

    // Open Graph
    setMetaByProp("og:title", meta.title);
    setMetaByProp("og:description", meta.desc);
    setMetaByProp("og:url", canonicalUrl);
    setMetaByProp("og:locale", lang === "hi" ? "hi_IN" : "en_IN");

    // Twitter
    setMetaByName("twitter:title", meta.title);
    setMetaByName("twitter:description", meta.desc);
  }, [pathname, lang]);

  return null;
};
