import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { PageLayout } from "../cfg"

function ObsidianPropertyTable(props: QuartzComponentProps) {
  const { fileData } = props
  const { frontmatter } = fileData

  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return null
  }

  // Helper function to format values
  const formatValue = (value: any): string => {
    if (value instanceof Date) {
      return value.toLocaleDateString()
    }
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    return String(value)
  }

  return (
    <div className="properties-table">
      <h3 className="properties-heading">Properties</h3>
      <div className="properties-container">
        {Object.entries(frontmatter).map(([key, value]) => (
          <div key={key} className="property-row">
            <div className="property-key">
              {key === 'tags' ? (
                <span className="tag-icon">🏷️</span>
              ) : key === 'created' ? (
                <span className="calendar-icon">📅</span>
              ) : (
                <span className="default-icon">≡</span>
              )}
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

export default (() => {
  return {
    Component: ObsidianPropertyTable,
    css: `
      .properties-table {
        margin: 1rem 0;
        padding: 1rem;
        background: var(--bg);
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
        gap: 0.5rem;
      }

      .property-row {
        display: flex;
        padding: 0.25rem 0;
        gap: 1rem;
        align-items: flex-start;
        line-height: 1.5;
      }

      .property-key {
        flex: 0 0 150px;
        color: var(--gray);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .property-value {
        flex: 1;
        color: var(--dark);
      }

      .tag-icon, .calendar-icon, .default-icon {
        opacity: 0.7;
        width: 20px;
        display: inline-flex;
        justify-content: center;
      }

      @media (prefers-color-scheme: dark) {
        .properties-table {
          background: var(--dark);
        }
        
        .property-value {
          color: var(--light);
        }
      }
    `
  }
}) satisfies QuartzComponentConstructor