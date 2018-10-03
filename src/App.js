import React from "react";
// import PropTypes from "prop-types";
import {
  Container,
  Form,
  Button,
  Header,
  Grid,
  List,
  Segment,
  Image,
  GridColumn
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import logo from "./logo.jpg";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
      urls: undefined,
      start: undefined,
      end: undefined,
      query: undefined,
      season: undefined,
      disabled: true,
      isSubmitting: false
    };
  }

  handleDownload = () => {
    let { url, start, end, query, isSubmitting, disabled, season } = this.state;
    url = url.toString().trim();

    query = url.match(/S0\dE\d+/);

    let i = start;
    let urls = [];

    for (i; i < end; i++) {
      const fileName = url.substring(url.lastIndexOf("/") + 1, url.length);
      const link = url.replace(query, `S0${season}E0${i}`);
      console.log(link);
      urls.push({ fileName, link });
    }

    this.setState({ urls });
  };

  renderUrls = () => {
    const { urls } = this.state;

    return (
      <List>
        {urls
          ? urls.map(url => {
              const { link, fileName } = url;
              return (
                <List.Item
                  icon="linkify"
                  key={fileName}
                  content={<a href={link}>{fileName}</a>}
                />
              );
            })
          : null}
      </List>
    );
  };
  //auto download not yet working. to be solved
  // downloadEpisodes(url, fileName) {
  //   var link = document.createElement("a");
  //   link.href = url;
  //   //link.target = "_blank";
  //   link.setAttribute("_target", "blank");
  //   link.download = fileName;
  //   link.style.display = "block";
  //   link.innerHTML = fileName;

  //   // var evt = new MouseEvent("click", {
  //   // 	view: window,
  //   // 	bubbles: true,
  //   // 	cancelable: true
  //   // });

  //   document.body.appendChild(link);
  //   // link.click();
  //   //document.body.removeChild(link);
  // }

  renderDetails = e => {
    const { url, start, end, isSubmitting, disabled, season } = this.state;
    return (
      <Container text style={{ marginTop: "100 auto" }}>
        <Header as="h1">Series Download</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
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

            <Grid.Column width={4}>{this.renderUrls()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  };

  render() {
    return (
      <Container>
        <Image src={logo} />
        {this.renderDetails()}
      </Container>
    );
  }
}
