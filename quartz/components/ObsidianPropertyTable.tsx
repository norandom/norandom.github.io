import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function ObsidianPropertyTableComponent(props: QuartzComponentProps) {
  console.log("Component props:", props)
  const { fileData } = props
  const { frontmatter } = fileData || {}

  console.log("Frontmatter:", frontmatter)

  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    console.log("No frontmatter found")
    return null
  }

  return (
    <div className="properties-table">
      <h3 className="properties-heading">Properties</h3>
      <div className="properties-container">
        {Object.entries(frontmatter).map(([key, value]) => (
          <div key={key} className="property-row">
            <div className="property-key">{key}</div>
            <div className="property-value">
              {value === null || value === undefined || value === "" 
                ? "Empty" 
                : String(value)
              }
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
        margin: 1rem 0;
        padding: 1rem;
        background: var(--bg);
        border: 1px solid var(--lightgray);
        border-radius: 8px;
      }

      .properties-heading {
        color: var(--dark);
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }

      .property-row {
        display: flex;
        gap: 1rem;
        padding: 0.5rem 0;
      }

      .property-key {
        flex: 0 0 150px;
        font-weight: 500;
      }

      .property-value {
        flex: 1;
      }
    `
  }
}