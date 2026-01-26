import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ResourcesPage() {
  const articles = [
    {
      title: "10 Signs Your Organization Needs a Custom Platform",
      excerpt:
        "Discover the key indicators that it's time to move beyond spreadsheets and off-the-shelf software.",
      category: "Strategy",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "/business-strategy-planning.png",
    },
    {
      title: "The True Cost of Technical Debt",
      excerpt:
        "Understanding how outdated systems impact your organization's growth and what you can do about it.",
      category: "Technology",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: "/technical-debt-code-quality.jpg",
    },
    {
      title: "Building Scalable Systems: A Practical Guide",
      excerpt:
        "Learn the principles and practices that ensure your platform can grow with your organization.",
      category: "Development",
      date: "March 5, 2024",
      readTime: "10 min read",
      image: "/scalable-cloud-architecture.jpg",
    },
    {
      title: "Security Best Practices for Custom Platforms",
      excerpt:
        "Essential security measures every organization should implement to protect their data and users.",
      category: "Security",
      date: "February 28, 2024",
      readTime: "8 min read",
      image: "/cybersecurity-data-protection.jpg",
    },
    {
      title: "Automating Workflows: Where to Start",
      excerpt:
        "A step-by-step approach to identifying and automating repetitive tasks in your organization.",
      category: "Automation",
      date: "February 20, 2024",
      readTime: "6 min read",
      image: "/workflow-automation-process.jpg",
    },
    {
      title: "Choosing the Right Technology Stack",
      excerpt:
        "How to select the technologies that will best serve your organization's needs and goals.",
      category: "Technology",
      date: "February 15, 2024",
      readTime: "9 min read",
      image: "/technology-stack-development.jpg",
    },
  ];

  const guides = [
    {
      title: "Platform Planning Checklist",
      description:
        "A comprehensive guide to planning your custom platform project",
      type: "PDF Download",
    },
    {
      title: "ROI Calculator",
      description:
        "Calculate the potential return on investment for your custom platform",
      type: "Interactive Tool",
    },
    {
      title: "Technology Glossary",
      description: "Understand common technical terms and concepts",
      type: "Reference Guide",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Resources & <span className="text-primary">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Expert guidance, best practices, and insights to help you make
                informed decisions about your technology investments.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center p-8 bg-card rounded-lg border border-border">
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Featured Article
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    The Complete Guide to Digital Transformation
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Everything you need to know about modernizing your
                    organization&apos;s technology infrastructure and processes.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>March 20, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>15 min read</span>
                    </div>
                  </div>
                  <Button size="lg">
                    Read Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden aspect-video border border-border">
                  <Image
                    src="/digital-transformation.png"
                    alt="Featured article"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Latest Articles
                </h2>
                <p className="text-lg text-muted-foreground">
                  Insights and best practices from our team of experts
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <article key={index} className="group space-y-4">
                    <div className="relative rounded-lg overflow-hidden border border-border aspect-video">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="inline-block px-3 py-1 rounded-full bg-muted text-sm">
                        {article.category}
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <Button variant="link" className="p-0 h-auto">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Free Guides & Tools
                </h2>
                <p className="text-lg text-muted-foreground">
                  Practical resources to help you plan and execute your
                  technology projects
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {guides.map((guide, index) => (
                  <div
                    key={index}
                    className="p-6 bg-card rounded-lg border border-border space-y-4"
                  >
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {guide.type}
                    </div>
                    <h3 className="text-xl font-semibold">{guide.title}</h3>
                    <p className="text-muted-foreground">{guide.description}</p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
              <p className="text-lg text-muted-foreground">
                Subscribe to our newsletter for the latest insights, tips, and
                updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                />
                <Button size="lg">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
