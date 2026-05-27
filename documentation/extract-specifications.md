# Extract Screen Specifications

Thoroughly analyze an EmberJS screen and extract complete specifications for migration.

## Output Location

Save the specification to: `documentation/specifications/[screen-name].md`

Use kebab-case for the filename based on the screen name (e.g., `bills-list.md`, `user-settings.md`, `incoming-registration-detail.md`).

Create the `documentation/specifications/` directory if it doesn't exist.

## Instructions

When the user specifies a screen to analyze, perform a comprehensive extraction of all implementation details.

### 1. Identify All Source Files

Find all relevant files:
- **Template**: `frontend-ember/src/js/templates/*.html` or dynamic template in controller
- **Controller/Route**: `frontend-ember/src/js/*.js`
- **Route definition**: `frontend-ember/src/js/application.js`
- **Shared components**: Any reusable templates or helpers used

Read all identified files completely.

### 2. Extract UI Elements

Document every UI element with its display conditions:

## UI Elements

### Element: [name/description]
- **Type**: button | link | input | select | table | modal | etc.
- **Display condition**: Always | if condition | unless condition
- **Content/Label**: Static text or property
- **CSS classes**: List all classes (static and dynamic)
- **Attributes**: id, name, data-*, disabled conditions, etc.

Pay special attention to:
- Conditional rendering (if, unless, each)
- Dynamic classes
- Loading states and spinners
- Empty states
- Error states

### 3. Extract Interactions

Document every user interaction:

## Interactions

### Action: [action name]
- **Trigger**: click | submit | change | keyup | etc.
- **Element**: Which element triggers it
- **Condition**: When is this action available/enabled
- **Handler**: action name and params
- **Behavior**: What happens when triggered
- **Side effects**: State changes, navigation, API calls

Include:
- Button clicks
- Form submissions
- Link navigations
- Input changes
- Keyboard shortcuts
- Modal open/close triggers

### 4. Extract API Calls

Document every API interaction:

## API Calls

### Endpoint: [METHOD /path]
- **When called**: On load | On action | On interval | etc.
- **Request data**: Parameters, body, headers
- **Success handling**: What happens on success
- **Error handling**: What happens on error
- **Loading state**: How loading is indicated
- **Response usage**: How response data is used/stored

Look for:
- $.ajax, $.get, $.post calls
- Ember.$.ajax calls
- Model hooks (model(), beforeModel(), afterModel())
- Action handlers that make API calls

### 5. Extract State & Computed Properties

Document all state management:

## State

### Property: [name]
- **Type**: string | number | boolean | array | object
- **Initial value**: Default value
- **Source**: API response | URL param | User input | Computed
- **Dependencies**: Other properties it depends on (for computed)
- **Usage**: Where/how it's used in the template

Look for:
- Controller properties
- Computed properties
- Observers
- URL parameters from route

### 6. Extract Navigation

Document all navigation paths:

## Navigation

### Route: [route name]
- **Path**: The URL path
- **Trigger**: Link | Action | Redirect
- **Parameters**: Route params passed
- **Condition**: When navigation is available

Look for:
- link-to helpers
- transitionTo() calls
- replaceWith() calls
- External links

### 7. Extract Validation Rules

Document form validations:

## Validation

### Field: [name]
- **Type**: text | email | number | date | etc.
- **Required**: yes | no | conditional
- **Format**: Regex or format requirements
- **Min/Max**: Length or value constraints
- **Custom rules**: Any custom validation logic
- **Error messages**: What's shown on validation failure

### 8. Extract i18n Strings

Document internationalization:

## i18n Strings

| Key | Default (EN) | Usage |
|-----|--------------|-------|
| key.name | English text | Where it's used |

Look for:
- i18n helpers
- References to nls/ files

### 9. Output Format

Present the complete specification in structured markdown with all sections above.

### 10. Extract React Codebase Patterns

CRITICAL: Before migration can begin, analyze the existing React codebase to understand established patterns.

Search the frontend/src/ directory for:
- Common Components in frontend/src/components/common/
- i18n Approach (injectIntl vs useIntl)
- State Management patterns
- Permission Checking patterns
- Testing Patterns
- Styling Conventions

### 11. Be Thorough

- Read the ENTIRE template and controller files
- Follow references to shared components/helpers
- Check for dynamically generated templates
- Note any jQuery DOM manipulation
- Document EVERYTHING
- Analyze 3-5 similar React components to understand established patterns

### 12. Save the Specification

After completing the analysis save to documentation/specifications/[screen-name].md
