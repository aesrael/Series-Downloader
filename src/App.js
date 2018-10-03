import React from "react";
import logo from "./logo.jpg";
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
import saveAs from "file-saver";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
      urls: undefined,
      start: undefined,
      end: undefined,
      query: undefined,
      disabled: true,
      isSubmitting: false
    };
  }

  handleDownload = () => {
    let { url, start, end, query } = this.state;
    url = url.toString().trim();
    let urls = [];
    let link = "";
    const proxy = `https://cors-preferental.herokuapp.com/`;
    query = url.match(/S0\dE\d+/) && url.match(/S0\dE\d+/)[0];

    let i = start;

    for (i; i <= end; i++) {
      if (i < 10) {
        link = `${url.replace(query, `S${query.substring(1, 3)}E0${i}`)}`;
      } else {
        link = `${url.replace(query, `S${query.substring(1, 3)}E${i}`)}`;
      }
      const fileName = link.substring(link.lastIndexOf("/") + 1, link.length);

      urls.push({ fileName, link });
    }

    this.setState({ urls });
    console.log(urls);
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
                  content={
                    <a target="_blank" href={link}>
                      {fileName}
                    </a>
                  }
                />
              );
            })
          : null}
        {urls ? (
          <Button
            onClick={() => {
              this.downloadEpisodes(urls);
            }}
          >
            Download all episodes
          </Button>
        ) : null}
      </List>
    );
  };
  //auto download not yet working. to be solved
  downloadEpisodes(urls) {
    urls.forEach(url => {
      // saveAs(url.link, url.fileName);
      let link = document.createElement("a");
      link.href = url.link;
      link.target = "_blank";
      link.setAttribute("_target", "blank");
      link.download = url.fileName;
      link.style.display = "block";
      link.innerHTML = url.fileName;
      document.body.appendChild(link);
      link.click();
    });
    // var evt = new MouseEvent("click", {
    // 	view: window,
    // 	bubbles: true,
    // 	cancelable: true
    // });

    // document.body.appendChild(link);
    // link.click();
    //document.body.removeChild(link);
  }

  renderDetails = e => {
    const { url, start, end, isSubmitting, disabled } = this.state;
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
                  disabled={url && start && end ? false : true}
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
