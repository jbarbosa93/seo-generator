export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  plan: "free" | "pro" | "business";
  credits_remaining: number;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SEOGeneration {
  id: string;
  user_id: string;
  input_keyword: string;
  input_url: string | null;
  input_language: string;
  input_content_type: ContentType;
  output_title: string;
  output_meta_description: string;
  output_headings: string[];
  output_keywords: string[];
  output_content: string;
  seo_score: number;
  created_at: string;
}

export type ContentType =
  | "blog_post"
  | "product_page"
  | "landing_page"
  | "category_page"
  | "homepage";

export interface GenerateSEORequest {
  keyword: string;
  url?: string;
  language: string;
  contentType: ContentType;
  tone?: string;
  wordCount?: number;
}

export interface GenerateSEOResponse {
  title: string;
  metaDescription: string;
  headings: string[];
  keywords: string[];
  content: string;
  seoScore: number;
}

export interface PricingPlan {
  name: string;
  price: number;
  priceId: string | null;
  credits: number;
  features: string[];
  popular?: boolean;
}
