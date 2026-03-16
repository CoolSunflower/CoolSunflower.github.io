import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: "fullstack" | "ml" | "systems" | "research";
  tech: string[];
  period: string;
  featured: boolean;
  color: string;
  github?: string;
  live?: string;
  image?: string;
  order?: number;
}

export interface ProjectContent {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjectSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return [];
    }
    return fs
      .readdirSync(contentDirectory)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getProjectBySlug(slug: string): ProjectContent | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllProjects(): ProjectContent[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is ProjectContent => project !== null)
    .sort((a, b) => {
      // Sort by order if specified, otherwise by featured status
      if (a.frontmatter.order !== undefined && b.frontmatter.order !== undefined) {
        return a.frontmatter.order - b.frontmatter.order;
      }
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      return 0;
    });

  return projects;
}

// Convert MDX projects to the format expected by the existing Projects component
export function getProjectsForDisplay() {
  const mdxProjects = getAllProjects();
  
  return mdxProjects.map((project, index) => ({
    id: index + 1,
    title: project.frontmatter.title,
    subtitle: project.frontmatter.subtitle,
    description: project.frontmatter.description,
    longDescription: project.frontmatter.longDescription || project.frontmatter.description,
    category: project.frontmatter.category,
    tech: project.frontmatter.tech,
    period: project.frontmatter.period,
    featured: project.frontmatter.featured,
    color: project.frontmatter.color,
    github: project.frontmatter.github,
    live: project.frontmatter.live,
    slug: project.slug,
  }));
}
