import React, { Children, Component } from "react";
import PropTypes from "prop-types";

export const phoneService = ComponentToWrap => {
  return class ThemeComponent extends Component {
    // let’s define what’s needed from the `context`
    static contextTypes = {
      phoneService: PropTypes.object
    };
    render() {
      const { phoneService } = this.context;
      // what we do is basically rendering `ComponentToWrap`
      // with an added `theme` prop, like a hook
      return <ComponentToWrap {...this.props} phoneService={phoneService} />;
    }
  };
};

export class PhoneProvider extends Component {
  state = {
    phoneService: this
  };
  static childContextTypes = {
    phoneService: PropTypes.object.isRequired
  };
  getChildContext() {
    return { phoneService: this.state.phoneService };
  }

  testFunction = () => {
    console.log("Hello World");
  };

  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children);
  }
}
