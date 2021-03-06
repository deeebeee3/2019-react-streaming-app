import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          //initialValues={{ title: "Edit Me", description: "change Me too" }}

          //stream has a title and description property so these will be used as initial values for form
          //use lodash to only pass title and description to StreamForm - not the id and userId
          initialValues={_.pick(this.props.stream, "title", "description")}
          
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateTopProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateTopProps,
  { fetchStream, editStream }
)(StreamEdit);

//passing initialValues down to a component wrapped by redux-form (StreamForm), initialValues is a special prop provided by redux-form. StreamEdit gets the prop because we are importing and using StreamForm which is wrapped by redux-form
