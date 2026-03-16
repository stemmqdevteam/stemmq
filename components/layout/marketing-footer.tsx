"use client";

import { useState } from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, Youtube, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FOOTER_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

function FooterSection({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MarketingFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border bg-background">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-10 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Stay up to date</h3>
            <p className="text-sm text-muted-foreground mt-1">Get the latest on decision intelligence, delivered weekly.</p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex w-full sm:w-auto gap-2"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-64"
            />
            <Button variant="accent" size="sm" className="shrink-0">
              Subscribe
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Links Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 lg:pr-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-lg font-semibold text-foreground">StemmQ</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Decision Intelligence Infrastructure for the Enterprise. Make better strategic decisions, faster.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <FooterSection title="Product" links={FOOTER_LINKS.product} />
          <FooterSection title="Platform" links={FOOTER_LINKS.platform} />
          <FooterSection title="Solutions" links={FOOTER_LINKS.solutions} />
          <FooterSection title="Resources" links={FOOTER_LINKS.resources} />
          <FooterSection title="Company" links={FOOTER_LINKS.company} />
          <FooterSection title="Developers" links={FOOTER_LINKS.developers} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} StemmQ, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { MarketingFooter };
