import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Send } from "lucide-react";
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";
import hiringPoster from "@/assets/hiring-poster.jpg";

const SEEN_KEY = "dahmi-hiring-popup-seen";
const SHOW_DELAY_MS = 1200;

export const HiringPopup = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // ignore storage errors
      }
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleApply = () => {
    setOpen(false);
    navigate("/careers");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          data-testid="hiring-popup"
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[88vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-2xl bg-background shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">
            {t.careers.opening.badge}: {t.careers.opening.title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {t.careers.opening.intro}
          </DialogPrimitive.Description>

          <img
            src={hiringPoster}
            alt={`${t.careers.opening.badge}: ${t.careers.opening.title}`}
            className="block w-full h-auto"
          />

          <DialogPrimitive.Close
            data-testid="hiring-popup-close"
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>

          <div className="p-3">
            <Button
              onClick={handleApply}
              data-testid="hiring-popup-apply-button"
              className="w-full gap-2 bg-[hsl(var(--brand-orange))] text-white hover:bg-[hsl(var(--brand-orange-2))]"
            >
              {t.careers.opening.cta}
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
