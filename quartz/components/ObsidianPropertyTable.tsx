import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { PageLayout } from "../cfg"

function ObsidianPropertyTableComponent(props: QuartzComponentProps) {
  const { fileData } = props
  const { frontmatter } = fileData

  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return null
  }

  // Helper function to format values
  const formatValue = (value: any): JSX.Element | string => {
    if (value === null || value === undefined || value === "") {
      return "Empty"
    }

    if (value instanceof Date) {
      return value.toLocaleDateString()
    }

    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <span key={index} className="tag-item">
          {item}
          {index < value.length - 1 ? ", " : ""}
        </span>
      ))
    }

    // Check if the value is a URL
    if (typeof value === 'string' && value.match(/^https?:\/\//)) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value} <span className="external-link-icon">↗</span>
        </a>
      )
    }

    return String(value)
  }

  // Function to get icon for property
  const getPropertyIcon = (key: string): string => {
    switch (key) {
      case 'tags':
        return '🏷️'
      case 'created':
        return '📅'
      case 'title':
        return '📝'
      case 'source':
        return '🔗'
      case 'author':
        return '👤'
      case 'published':
        return '📢'
      case 'description':
        return '📋'
      default:
        return '≡'
    }
  }

  return (
    <div className="properties-table">
      <h3 className="properties-heading">Properties</h3>
      <div className="properties-container">
        {Object.entries(frontmatter).map(([key, value]) => (
          <div key={key} className="property-row">
            <div className="property-key">
              <span className="property-icon">{getPropertyIcon(key)}</span>
              {key}
            </div>
            <div className="property-value">
              {formatValue(value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
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

      .property-value a {
        color: var(--secondary);
        text-decoration: none;
      }

      .property-value a:hover {
        text-decoration: underline;
      }

      .external-link-icon {
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

        .property-value a {
          color: var(--secondary);
        }
      }
    `
  }
}