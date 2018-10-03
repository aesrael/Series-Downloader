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
      season: undefined,
      disabled: true,
      isSubmitting: false
    };
  }
  componentDidMount() {}
  handleDownload = () => {
    let { url, start, end, query, isSubmitting, disabled, season } = this.state;
    url = url.toString().trim();
    query = `S0${season}E0{start}`;
    let i = start;
    for (i; i < end; i++) {
      console.log(url.replace(query, `S0${season}E0${i}`));
      this.downloadEpisodes(url.replace(query, `S0${season}E0${i}`));
    }
  };

  downloadEpisodes(url, fileName) {
    var link = document.createElement("a");
    link.href = url;
    //link.target = "_blank";
    link.setAttribute("_target", "blank");
    link.setAttribute("download", fileName);
    // link.style.display = "none";
    console.log(link);
    // var evt = new MouseEvent("click", {
    // 	view: window,
    // 	bubbles: true,
    // 	cancelable: true
    // });

    document.body.appendChild(link);
    //link.click();
    //document.body.removeChild(link);
  }

  renderDetails = e => {
    const { url, start, end, isSubmitting, disabled, season } = this.state;
    return (
      <Container text style={{ marginTop: "100px" }}>
        <Header as="h1">Series Download</Header>
        <Grid centered columns={1}>
          <Grid.Column>
            <Form
              onSubmit={() => {
                this.handleDownload();
              }}
            >
              <Form.Input
                label="download link"
                type="text"
                onChange={e => this.setState({ url: e.target.value })}
                placeholder="enter url for one of the episodes here"
              />
              <Form.Input
                label="enter the season?"
                type="number"
                onChange={e => this.setState({ season: e.target.value })}
                placeholder="e.g 2"
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

              <Button
                onClick={() => {
                  this.handleDownload();
                }}
                disabled={url && start && end && season ? false : true}
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
