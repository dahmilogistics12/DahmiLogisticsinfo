{
  "brand": {
    "name": "Dahmi Logistics",
    "attributes": [
      "trustworthy",
      "disciplined",
      "on-time",
      "safety-first",
      "Pan-India scale",
      "B2B professional"
    ],
    "design_style_fusion": {
      "layout_principle": "Swiss-style grid + modern B2B landing (clear hierarchy, generous whitespace)",
      "visual_motif": "Dispatch-board cues (route lines, nodes, status chips) without looking like a dashboard",
      "surface_style": "Crisp light surfaces + deep navy anchors; subtle grain/noise; minimal gradients used only as section accents"
    }
  },
  "information_architecture": {
    "routes": [
      {
        "path": "/",
        "name": "Home",
        "sections": [
          "Hero",
          "Stats strip",
          "About preview",
          "For Shippers benefits",
          "Our Commitment",
          "For Vendors/Transport Partners",
          "Fleet showcase",
          "Value props strip",
          "Network/Branches",
          "CTA banner",
          "Contact preview"
        ]
      },
      { "path": "/about", "name": "About" },
      { "path": "/services", "name": "Services" },
      { "path": "/fleet", "name": "Fleet" },
      { "path": "/network", "name": "Network/Branches" },
      { "path": "/contact", "name": "Contact" }
    ],
    "primary_success_actions": [
      "Click-to-call from sticky navbar",
      "Submit Contact Us form"
    ],
    "secondary_actions": [
      "Navigate to Services/Fleet/Network",
      "Switch language EN/HI"
    ]
  },
  "typography": {
    "font_pairing": {
      "primary_ui": "Space Grotesk (Latin) + Noto Sans Devanagari (Hindi)",
      "fallbacks": ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      "why": "Space Grotesk feels modern/industrial for B2B; Noto Sans Devanagari ensures clean Hindi rendering. Both have sturdy counters for small mobile text."
    },
    "loading_instruction": {
      "where": "public/index.html",
      "google_fonts_link": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap",
      "css_usage": "font-family: 'Noto Sans Devanagari','Space Grotesk',system-ui,sans-serif;"
    },
    "text_size_hierarchy": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-muted-foreground",
      "h3_section_title": "text-xl sm:text-2xl font-semibold tracking-tight",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs sm:text-sm text-muted-foreground"
    },
    "bilingual_rules": {
      "language_toggle_labels": ["English", "हिन्दी"],
      "avoid": ["EN/HI only", "flags"],
      "html_lang": {
        "en": "en",
        "hi": "hi"
      }
    }
  },
  "color_system": {
    "notes": [
      "Brand affinity: navy + orange. Use navy as anchor (header/footer/hero accents), orange as CTA + highlights.",
      "Keep reading areas on light backgrounds for trust + clarity.",
      "No dark/saturated gradients; gradients only as subtle section accents (<20% viewport)."
    ],
    "tokens_css_variables": {
      "where": "/app/frontend/src/index.css :root",
      "light": {
        "--background": "210 33% 98%",
        "--foreground": "222 47% 11%",
        "--card": "0 0% 100%",
        "--card-foreground": "222 47% 11%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222 47% 11%",
        "--primary": "222 62% 18%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 30% 96%",
        "--secondary-foreground": "222 47% 11%",
        "--muted": "210 25% 95%",
        "--muted-foreground": "215 16% 40%",
        "--accent": "28 92% 55%",
        "--accent-foreground": "222 47% 11%",
        "--border": "214 20% 88%",
        "--input": "214 20% 88%",
        "--ring": "28 92% 55%",
        "--destructive": "0 84% 60%",
        "--destructive-foreground": "210 40% 98%",
        "--radius": "0.75rem",
        "--chart-1": "28 92% 55%",
        "--chart-2": "199 84% 45%",
        "--chart-3": "222 62% 18%",
        "--chart-4": "43 90% 55%",
        "--chart-5": "160 60% 40%",
        "--brand-navy": "222 62% 18%",
        "--brand-navy-2": "222 55% 24%",
        "--brand-orange": "28 92% 55%",
        "--brand-orange-2": "24 95% 50%",
        "--brand-sky": "199 84% 45%",
        "--brand-sand": "38 45% 92%"
      },
      "dark_optional": {
        "note": "Site can remain light-first; if dark mode is added later, keep it solid (no gradients).",
        "--background": "222 47% 8%",
        "--foreground": "210 40% 98%",
        "--card": "222 47% 10%",
        "--card-foreground": "210 40% 98%",
        "--primary": "210 40% 98%",
        "--primary-foreground": "222 47% 11%",
        "--accent": "28 92% 55%",
        "--accent-foreground": "222 47% 11%",
        "--border": "222 30% 18%",
        "--input": "222 30% 18%",
        "--ring": "28 92% 55%"
      }
    },
    "gradients": {
      "allowed_usage": [
        "Hero background overlay only",
        "Large CTA banner background only",
        "Decorative route-line glow overlays"
      ],
      "recipes": [
        {
          "name": "hero-mist",
          "css": "radial-gradient(900px circle at 20% 10%, hsla(199,84%,45%,0.14), transparent 55%), radial-gradient(700px circle at 80% 0%, hsla(28,92%,55%,0.12), transparent 52%)",
          "note": "Light, airy; stays under 20% perceived gradient coverage due to transparency."
        },
        {
          "name": "cta-sand",
          "css": "linear-gradient(135deg, hsla(38,45%,92%,1) 0%, hsla(210,33%,98%,1) 55%, hsla(28,92%,55%,0.10) 100%)",
          "note": "Very mild; safe for banner backgrounds."
        }
      ]
    },
    "texture": {
      "noise_overlay": {
        "css_snippet": ".noise::before{content:'';position:absolute;inset:0;background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.08%22/%3E%3C/svg%3E');mix-blend-mode:multiply;pointer-events:none;border-radius:inherit;}",
        "usage": "Apply to hero and CTA banner wrappers only (position:relative)."
      }
    }
  },
  "layout_grid": {
    "container": "max-w-6xl mx-auto px-4 sm:px-6",
    "section_spacing": "py-14 sm:py-18 lg:py-22",
    "stacking": {
      "mobile": "single column; cards become horizontal only at md",
      "desktop": "use 12-col grid; keep text blocks 6-7 cols max for readability"
    },
    "patterns": {
      "hero": "grid grid-cols-1 lg:grid-cols-12 gap-10 items-center",
      "two_column": "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10",
      "icon_grid": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
      "bento": "grid grid-cols-1 md:grid-cols-12 gap-4"
    }
  },
  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui",
      "use_components": [
        { "name": "button", "path": "src/components/ui/button.jsx" },
        { "name": "card", "path": "src/components/ui/card.jsx" },
        { "name": "badge", "path": "src/components/ui/badge.jsx" },
        { "name": "navigation-menu", "path": "src/components/ui/navigation-menu.jsx" },
        { "name": "sheet", "path": "src/components/ui/sheet.jsx" },
        { "name": "separator", "path": "src/components/ui/separator.jsx" },
        { "name": "accordion", "path": "src/components/ui/accordion.jsx" },
        { "name": "tabs", "path": "src/components/ui/tabs.jsx" },
        { "name": "carousel", "path": "src/components/ui/carousel.jsx" },
        { "name": "form", "path": "src/components/ui/form.jsx" },
        { "name": "input", "path": "src/components/ui/input.jsx" },
        { "name": "textarea", "path": "src/components/ui/textarea.jsx" },
        { "name": "select", "path": "src/components/ui/select.jsx" },
        { "name": "sonner", "path": "src/components/ui/sonner.jsx" },
        { "name": "tooltip", "path": "src/components/ui/tooltip.jsx" }
      ]
    },
    "navbar": {
      "behavior": [
        "Sticky top with subtle blur and border",
        "Left: logo + primary links",
        "Right: language toggle + phone CTA button",
        "Mobile: hamburger opens Sheet with nav + language toggle + call button"
      ],
      "tailwind": {
        "wrapper": "sticky top-0 z-50 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b",
        "inner": "max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between",
        "logo": "font-semibold tracking-tight text-[15px] sm:text-base",
        "nav_link": "text-sm font-medium text-foreground/80 hover:text-foreground transition-colors",
        "active_link": "text-foreground"
      },
      "language_toggle": {
        "component": "DropdownMenu OR Switch (two languages). Prefer DropdownMenu for clarity on mobile.",
        "labels": ["English", "हिन्दी"],
        "data_testid": "language-toggle",
        "tailwind": "h-9 px-3 rounded-md border bg-background hover:bg-muted transition-colors"
      },
      "phone_cta": {
        "copy": "+91 9903830332",
        "data_testid": "navbar-call-button",
        "variant": "default",
        "tailwind": "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:brightness-[0.98]"
      }
    },
    "hero": {
      "layout": "Left copy + CTAs; right visual (truck image or abstract India network card).",
      "headline": "Delivering Trust, Driving Growth — Reliable Logistics Solutions Across India",
      "tagline": "On Time Every Time",
      "primary_cta": {
        "label": "Contact Us",
        "data_testid": "hero-contact-button"
      },
      "secondary_cta": {
        "label": "Call Now",
        "data_testid": "hero-call-button"
      },
      "visual": {
        "option_a": "Hero image with subtle navy overlay + route-line SVG",
        "option_b": "Card with India network pins + branch list preview"
      },
      "tailwind": {
        "section": "relative overflow-hidden",
        "bg": "absolute inset-0 opacity-100",
        "content": "relative noise",
        "headline": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
        "tag": "inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs sm:text-sm",
        "cta_row": "mt-6 flex flex-col sm:flex-row gap-3"
      },
      "micro_interactions": [
        "Primary CTA: hover brightness + subtle translate-y-[-1px] (use transition-colors + shadow only; no transition-all)",
        "Secondary CTA: ghost button with border; hover bg-muted"
      ]
    },
    "stats_strip": {
      "design": "4 stats in a bordered card row; each stat has label + value; optional icon.",
      "tailwind": "mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3",
      "card": "rounded-xl border bg-card p-4",
      "data_testid": "stats-strip"
    },
    "benefits_sections": {
      "for_shippers": {
        "component": "Card grid with icons + short copy",
        "items": [
          "Timely & Reliable Deliveries",
          "Pan India Coverage (FTL / Part Load / Express)",
          "Real Time Tracking visibility",
          "Best Price Assurance",
          "Dedicated Support"
        ],
        "data_testid": "for-shippers-section"
      },
      "for_partners": {
        "component": "Bento grid: 1 large card + 4 small cards",
        "items": [
          "Regular Business Opportunities",
          "Fast Payments",
          "Transparent Dealings",
          "Digital & Easy Process",
          "Long Term Partnerships"
        ],
        "data_testid": "for-partners-section"
      }
    },
    "our_commitment": {
      "component": "Tabs or icon row + supporting paragraph",
      "pillars": ["Safety", "Reliability", "Transparency", "Timely Delivery"],
      "quote": "Your Cargo, Our Responsibility",
      "data_testid": "our-commitment-section"
    },
    "fleet_showcase": {
      "component": "Carousel on mobile; grid on desktop",
      "items": ["FTL", "LCV", "Open Body Trucks", "Container Trucks", "Trailer Services"],
      "data_testid": "fleet-showcase"
    },
    "network": {
      "component": "Map-like panel + branch chips",
      "branches": {
        "main": ["Kolkata", "Durgapur", "Haldia"],
        "satellite": ["Gauhati", "Ranchi", "Bhubaneswar", "Mumbai", "Surat"]
      },
      "ui": [
        "Use Badge components as city chips",
        "Use a light map image/illustration background with orange pins",
        "Add a small legend: Main Branch / Satellite"
      ],
      "data_testid": "network-section"
    },
    "cta_banner": {
      "copy": "Let's Move Together — Connect | Collaborate | Grow",
      "design": "Full-width banner card with mild gradient + noise; CTA button to Contact",
      "data_testid": "cta-banner"
    },
    "contact_form": {
      "fields": [
        { "name": "name", "type": "text", "required": true, "data_testid": "contact-name-input" },
        { "name": "phone", "type": "tel", "required": true, "data_testid": "contact-phone-input" },
        { "name": "email", "type": "email", "required": false, "data_testid": "contact-email-input" },
        {
          "name": "service_interest",
          "type": "select",
          "options": ["FTL", "Part Load", "Express", "Vendor Partnership", "Other"],
          "required": true,
          "data_testid": "contact-service-select"
        },
        { "name": "message", "type": "textarea", "required": true, "data_testid": "contact-message-textarea" }
      ],
      "submit": { "label": "Send Message", "data_testid": "contact-submit-button" },
      "toast": "Use sonner for success/error",
      "details_block": {
        "phone": "+91 9903830332",
        "email": "dahmilogistics@gmail.com",
        "data_testid": "contact-details"
      }
    },
    "footer": {
      "design": "Navy solid background, light text, simple columns, no gradients",
      "data_testid": "site-footer"
    }
  },
  "motion_microinteractions": {
    "library": {
      "recommended": "framer-motion",
      "why": "Entrance animations for sections, hover micro-interactions, reduced-motion support.",
      "install": "npm i framer-motion",
      "usage_notes": [
        "Use whileInView for section reveals",
        "Respect prefers-reduced-motion",
        "Avoid animating layout on every render"
      ]
    },
    "principles": [
      "Use motion to guide attention: hero -> stats -> benefits -> contact",
      "Keep durations 180–260ms for hover; 420–650ms for section reveals",
      "Easing: cubic-bezier(0.2, 0.8, 0.2, 1)",
      "No parallax heavy effects; subtle only (B2B trust)"
    ],
    "examples": {
      "button_hover": "hover:shadow-sm hover:-translate-y-[1px] transition-[background-color,box-shadow] duration-200",
      "card_hover": "hover:shadow-md hover:border-foreground/15 transition-[box-shadow,border-color] duration-200",
      "nav_blur": "bg-background/85 backdrop-blur transition-[background-color] duration-200"
    }
  },
  "iconography": {
    "library": {
      "preferred": "lucide-react",
      "install": "npm i lucide-react",
      "usage": "Use icons for benefits, stats, commitment pillars. Keep stroke width consistent (1.75–2)."
    },
    "do_not_use": ["emoji icons"],
    "suggested_icons": {
      "timely": "Clock",
      "coverage": "MapPinned",
      "tracking": "Radar",
      "price": "BadgePercent",
      "support": "Headset",
      "safety": "ShieldCheck",
      "transparency": "ScanEye",
      "reliability": "CheckCircle2",
      "fleet": "Truck"
    }
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast for text and interactive elements",
      "Visible focus ring using --ring (orange) with ring-offset",
      "Keyboard navigable navbar + language toggle + form",
      "Use aria-labels for icon-only buttons",
      "Use semantic headings order (H1 once per page)"
    ],
    "reduced_motion": {
      "rule": "If prefers-reduced-motion: reduce, disable entrance animations and keep hover transitions minimal."
    }
  },
  "testing_attributes": {
    "rule": "All interactive and key informational elements MUST include data-testid (kebab-case).",
    "minimum_set": [
      "language-toggle",
      "navbar-call-button",
      "navbar-mobile-menu-button",
      "hero-contact-button",
      "hero-call-button",
      "stats-strip",
      "for-shippers-section",
      "our-commitment-section",
      "for-partners-section",
      "fleet-showcase",
      "network-section",
      "cta-banner",
      "contact-name-input",
      "contact-phone-input",
      "contact-email-input",
      "contact-service-select",
      "contact-message-textarea",
      "contact-submit-button",
      "contact-details",
      "site-footer"
    ]
  },
  "image_urls": {
    "hero": [
      {
        "url": "https://images.unsplash.com/photo-1530547429276-0b6e470c90b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoaWdod2F5JTIwZnJlaWdodCUyMHRydWNrJTIwbG9naXN0aWNzfGVufDB8fHxibHVlfDE3ODQ1NDU0OTh8MA&ixlib=rb-4.1.0&q=85",
        "description": "Highway truck motion shot; use with subtle navy overlay for hero right visual."
      },
      {
        "url": "https://images.unsplash.com/photo-1708526150183-5007b1f6833c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBoaWdod2F5JTIwZnJlaWdodCUyMHRydWNrJTIwbG9naXN0aWNzfGVufDB8fHxibHVlfDE3ODQ1NDU0OTh8MA&ixlib=rb-4.1.0&q=85",
        "description": "Truck + mountain road; good for Fleet page hero."
      }
    ],
    "fleet_section": [
      {
        "url": "https://images.pexels.com/photos/21615979/pexels-photo-21615979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Colorful Indian cargo truck; use as one fleet card image (avoid over-saturation by adding neutral overlay)."
      },
      {
        "url": "https://images.pexels.com/photos/29399463/pexels-photo-29399463.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Industrial truck/warehouse vibe; use for Trailer/Container service card."
      }
    ],
    "network_section": [
      {
        "url": "https://images.pexels.com/photos/8828354/pexels-photo-8828354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "India map with pins; use as blurred/low-opacity background in Network panel (ensure readability)."
      }
    ],
    "about_section": [
      {
        "url": "https://images.pexels.com/photos/38107476/pexels-photo-38107476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Workers unloading goods; use sparingly to convey real operations (trust)."
      }
    ]
  },
  "instructions_to_main_agent": {
    "global_css_cleanup": [
      "Remove default CRA App.css centering/header styles; do not use .App { text-align:center }.",
      "Update /app/frontend/src/index.css tokens to the navy/orange system above.",
      "Set body font-family to Noto Sans Devanagari + Space Grotesk stack.",
      "Add noise utility class (hero + CTA banner only)."
    ],
    "language_system": [
      "Implement a simple i18n dictionary object (en/hi) and a LanguageContext.",
      "Persist language in localStorage (key: dahmi-lang).",
      "Language toggle in navbar uses shadcn DropdownMenu or Switch; labels must be native (English/हिन्दी).",
      "Ensure all routes render translated copy; keep same route path (no /en prefix) for v1 simplicity."
    ],
    "page_build_notes": [
      "Home hero: left copy + CTAs; right image card with route-line overlay.",
      "Use Card components for all content blocks; keep backgrounds solid white for readability.",
      "Fleet: use Carousel on mobile (shadcn carousel) and grid on desktop.",
      "Network: create a map-like panel with badges for branches; add legend chips.",
      "Contact: use shadcn Form + Input + Select + Textarea; submit to FastAPI endpoint; show sonner toast."
    ],
    "data_testid_enforcement": "Add data-testid to every button/link/input and key info blocks listed in testing_attributes.minimum_set."
  },
  "general_ui_ux_design_guidelines": [
    "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms",
    "- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text",
    "- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json",
    "\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
  ]
}
