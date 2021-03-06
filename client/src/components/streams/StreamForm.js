import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = (/*formProps*/ { input, label, meta }) => {
    //console.log(meta);

    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* <div>{meta.error}</div> */}
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    //now dont get useless event object which we only needed so we could preventDefault
    //this works because our onSubmit is wrapped with redux forms handleSubmit function
    //console.log(formValues);

    this.props.onSubmit(formValues);
  };

  render() {
    //console.log(this.props); - props from redux form
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//called whenever form is initially rendered or user interacts with it in any way
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  //everytime object returned, our form will be rerendered
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validate
})(StreamForm);
