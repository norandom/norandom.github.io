import { QuartzComponentConstructor, QuartzComponentProps } from "./types";

function ObsidianPropertyTableComponent(props: QuartzComponentProps) {
  const { fileData } = props;
  const { frontmatter } = fileData || {};

  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return null;
  }

  // Helper function to format values
  const formatValue = (value: any): JSX.Element | string => {
    if (value === undefined || value === null || value === "") {
      return <span className="empty-value">Empty</span>;
    }

    if (value instanceof Date || (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}/))) {
      const date = new Date(value);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="empty-value">Empty</span>;
      }
      return value.map((item, index) => (
        <span key={index} className="tag-item">
          {item}
          {index < value.length - 1 ? ", " : ""}
        </span>
      ));
    }

    if (typeof value === "string" && value.match(/^https?:\/\//)) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="external-link">
          {value} <span className="external-icon">↗</span>
        </a>
      );
    }

    return String(value);
  };

  return (
    <div className="properties-table">
      <h3 className="properties-heading">Properties</h3>
      <div className="properties-container">
        {Object.entries(frontmatter)
          .filter(([_, value]) => value !== null && value !== undefined)
          .map(([key, value]) => (
            <div key={key} className="property-row">
              <div className="property-key">
                <span className="property-icon">
                  {key === "tags"
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
                {key}
              </div>
              <div className="property-value">{formatValue(value)}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export const ObsidianPropertyTable: QuartzComponentConstructor = () => {
  return {
    Component: ObsidianPropertyTableComponent,
    css: `
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

      .empty-value {
        color: var(--gray);
        font-style: italic;
      }

      .external-link {
        color: var(--secondary);
        text-decoration: none;
      }

      .external-link:hover {
        text-decoration: underline;
      }

      .external-icon {
        font-size: 0.8em;
        margin-left: 0.2em;
        opacity: 0.8;
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
    `,
  };
};
