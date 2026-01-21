import React from "react"
import PrimaryButton from "./_PrimaryButton"

/**
 * use this on react forms because there is a race condition between the blur of the last input updated and the button click.
 * The blur causes a rerender which blocks the onclick (in chrome though not in firefox or safari)
 * The ensures the button doesn't rerender if the props are the same
 */
export default React.memo(props => <PrimaryButton type="submit" {...props} />);