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

    // Always render "source" as a link, truncating if necessary
    if (key === "source" && typeof value === "string") {
      const shortened = value.length > 15 ? `${value.slice(0, 15)}...` : value;
      return `<a href="${encodeURI(value)}" target="_blank" rel="noopener noreferrer" class="external-link">${shortened}</a>`;
    }

    return String(value);
  };

  // Generate the HTML content directly as a string
  const content = `
    <div class="properties-table">
      <h3 class="properties-heading">Properties</h3>
      <div class="properties-container">
        ${Object.entries({
          title: frontmatter.title,
          source: frontmatter.source,
          author: frontmatter.author,
          published: frontmatter.published,
          created: frontmatter.created,
          description: frontmatter.description,
          tags: frontmatter.tags,
        }).map(([key, value]) => `
          <div class="property-row">
            <div class="property-key">
              <span class="property-icon">
                ${key === "tags"
                  ? "🏷️"
                  : key === "created"
                  ? "📅"
                  : key === "title"
                  ? "📝"
                  : key === "source"
                  ? "🔗"
                  : key === "author"
                  ? "👤"
                  : key === "published"
                  ? "📢"
                  : key === "description"
                  ? "📋"
                  : "≡"}
              </span>
              ${key}
            </div>
            <div class="property-value">${displayValue(key, value)}</div>
          </div>
        `).join("")}
      </div>
      <style>
        .properties-table {
          margin: 1rem 0 2rem 0;
          padding: 1.5rem;
          background: var(--bg);
          border: 1px solid var(--lightgray);
          border-radius: 8px;
        }

        .properties-heading {
          color: var(--dark);
          font-size: 1.2rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .properties-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .property-row {
          display: flex;
          padding: 0.25rem 0;
          gap: 1.5rem;
          align-items: flex-start;
          line-height: 1.5;
        }

        .property-key {
          flex: 0 0 150px;
          color: var(--gray);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .property-icon {
          opacity: 0.8;
          font-size: 1.1em;
        }

        .property-value {
          flex: 1;
          color: var(--dark);
        }

        .external-link {
          color: var(--secondary);
          text-decoration: none;
        }

        .external-link:hover {
          text-decoration: underline;
        }

        .tag-item {
          display: inline-block;
          padding: 0.1em 0.4em;
          margin: 0 0.2em;
          background: var(--lightgray);
          border-radius: 4px;
          font-size: 0.9em;
        }

        @media (prefers-color-scheme: dark) {
          .properties-table {
            border-color: var(--darkgray);
          }

          .property-value {
            color: var(--light);
          }

          .external-link {
            color: var(--secondary);
          }
        }
      </style>
    </div>
  `;

  return content;
};

export default ObsidianPropertyTableComponent;
