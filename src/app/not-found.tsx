import Link from "next/link";
import Wrapper from "@/app/Wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Wrapper forceNavbarBackground>
      <section className="bg-[#f7f9f2] md:mt-14 mt-8 min-h-[70vh] flex items-center justify-center px-4 py-24 text-[#0A211F]">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <Badge
            variant="outline"
            className="rounded-full border-[#0A211F]/20 bg-[#EDF6E8] px-4 py-1 text-sm text-[#0A211F]"
          >
            404 Error
          </Badge>

          <h1 className="text-4xl font-semibold sm:text-6xl text-[#0A211F]">
            404 - Page Not Found
          </h1>

          <p className="text-lg leading-relaxed text-[#0A211F]/75 max-w-xl mx-auto">
            The page or resource you requested could not be found on Quzex. If you are an AI agent or crawler, please refer to our machine-readable indices below.
          </p>

          <div className="rounded-2xl border border-[#0A211F]/10 bg-white p-6 md:p-8 text-left space-y-4">
            <h2 className="text-xl font-semibold text-[#0A211F]">
              Where to look next (Agent Recovery Options)
            </h2>
            <ul className="grid gap-2 text-sm text-[#0A211F]/80 md:grid-cols-2">
              <li>
                <Link href="/sitemap.xml" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  XML Sitemap (/sitemap.xml)
                </Link>
              </li>
              <li>
                <Link href="/llms.txt" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  LLMs Index (/llms.txt)
                </Link>
              </li>
              <li>
                <Link href="/llms-full.txt" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  Full LLM Docs (/llms-full.txt)
                </Link>
              </li>
              <li>
                <Link href="/developer" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  Developer & Agent Portal (/developer)
                </Link>
              </li>
              <li>
                <Link href="/openapi.json" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  OpenAPI Specification (/openapi.json)
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  Quzex Services (/services)
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  Portfolio Work (/work)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#0A211F] font-medium underline hover:text-[#143531]">
                  Contact Quzex (/contact)
                </Link>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <Button asChild className="rounded-xl bg-[#0A211F] px-6 text-[#E9F3E6] hover:bg-[#143531]">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl border-[#0A211F]/20">
              <Link href="/developer">Developer Docs</Link>
            </Button>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
