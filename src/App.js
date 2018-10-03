import React from "react";
// import PropTypes from "prop-types";
import {
  Container,
  Form,
  Button,
  Header,
  Grid,
  Segment,
  Image
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
      start: undefined,
      end: undefined,
      query: undefined,
      disabled: true,
      isSubmitting: false
    };
  }
  componentDidMount() {}
  onsubmit = () => {
    console.log(this.state);
  };
  renderDetails = e => {
    const { url, start, end, isSubmitting, disabled } = this.state;
    return (
      <Container text style={{ marginTop: "100px" }}>
        <Header as="h1">Series Download</Header>
        <Grid centered columns={1}>
          <Grid.Column>
            <Form
              onSubmit={() => {
                this.onsubmit();
              }}
            >
              <Form.Input
                label="download link"
                type="text"
                onChange={e => this.setState({ url: e.target.value })}
                placeholder="enter url for one of the episodes here"
              />

              <Form.Input
                label="start from episode?"
                type="number"
                onChange={e => this.setState({ start: e.target.value })}
                placeholder="e.g 1"
              />

              <Form.Input
                label="to episode?"
                type="number"
                onChange={e => this.setState({ end: e.target.value })}
                placeholder="e.g 10"
              />
              {console.log(url && start && end ? false : true)}
              <Button
                onClick={() => {
                  this.onsubmit;
                }}
                disabled={url && start && end ? false : true}
              >
                Download
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  };

  render() {
    return <Container>{this.renderDetails()}</Container>;
  }
}
