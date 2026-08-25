import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/site";

export type ProblemDetailsOptions = {
  status: number;
  code: string;
  title: string;
  detail: string;
  hint?: string;
  invalidParams?: Array<{ name: string; reason: string }>;
};

export function createProblemDetailsResponse({
  status,
  code,
  title,
  detail,
  hint,
  invalidParams,
}: ProblemDetailsOptions) {
  const problemDetails = {
    type: `${SITE_CONFIG.siteUrl}/developer#${code}`,
    title,
    status,
    code,
    detail,
    ...(hint ? { hint } : {}),
    ...(invalidParams && invalidParams.length > 0 ? { invalidParams } : {}),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(problemDetails, {
    status,
    headers: {
      "Content-Type": "application/problem+json; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
    },
  });
}
