import { QuartzComponentProps } from "./types";

const ObsidianPropertyTableComponent = (props: QuartzComponentProps): string => {
  const { fileData } = props;
  const { frontmatter } = fileData || {};

  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return "";
  }

  const displayValue = (key: string, value: any): string => {
    if (value === undefined || value === null || value === "") {
      return "-";
    }

    // Always render "source" as a Markdown link, truncating if necessary
    if (key === "source" && typeof value === "string") {
      const shortened = value.length > 15 ? `${value.slice(0, 15)}...` : value;
      return `[${shortened}](${value})`;
    }

    return String(value);
  };

  // Generate Markdown content directly
  const content = `
### Properties

${Object.entries({
    title: frontmatter.title,
    source: frontmatter.source,
    author: frontmatter.author,
    published: frontmatter.published,
    created: frontmatter.created,
    description: frontmatter.description,
    tags: frontmatter.tags,
  })
    .map(
      ([key, value]) =>
        `- **${key.charAt(0).toUpperCase() + key.slice(1)}**: ${displayValue(
          key,
          value
        )}`
    )
    .join("\n")}
  `;

  return content;
};

export default ObsidianPropertyTableComponent;
