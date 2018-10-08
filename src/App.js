import React from "react";
import logo from "./logo.jpg";
import {
  Container,
  Form,
  Button,
  Header,
  Grid,
  List,
  Image,
  Icon
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
      urls: undefined,
      start: undefined,
      end: undefined,
      disabled: true,
      isSubmitting: false,
      errors: []
    };
  }

  handleDownload = () => {
    let { url, start, end } = this.state;
    url = url.toString().trim();

    let link = "",
      urls = [],
      query = "";

    query = url.match(/S(\d+)E(\d+)/) && url.match(/S(\d+)E(\d+)/)[0];

    let i = start;
    if (query) {
      for (i; i <= end; i++) {
        if (i < 10) {
          link = `${url.replace(query, `S${query.substring(1, 3)}E0${i}`)}`;
        } else {
          link = `${url.replace(query, `S${query.substring(1, 3)}E${i}`)}`;
        }
        const fileName = link.substring(link.lastIndexOf("/") + 1, link.length);

        urls.push({ fileName, link });
      }
    }
    this.setState({ urls });
  };

  renderUrls = () => {
    const { urls } = this.state;
    return (
      <List ordered>
        {Array.isArray(urls)
          ? urls.map(url => {
              const { link, fileName } = url;
              return (
                <List.Item
                  icon="linkify"
                  key={fileName}
                  content={
                    <a target="_blank" href={`${link}`}>
                      {fileName}
                    </a>
                  }
                />
              );
            })
          : null}
        {Array.isArray(urls) ? (
          <Button
            fluid
            primary
            onClick={() => {
              this.downloadEpisodes(urls);
            }}
          >
            {" "}
            Download all episodes
          </Button>
        ) : null}
      </List>
    );
  };

  downloadEpisodes(urls) {
    urls.forEach(url => {
      let link = document.createElement("a");
      link.href = url.link;
      link.setAttribute("_target", "blank");
      link.download = url.fileName;
      link.style.display = "none";
      link.innerHTML = url.fileName;
      document.body.appendChild(link);
      window.open(url.link);
    });
    //auto download not yet working. //TODO
    // saveAs(url.link, url.fileName);
    // let link = document.createElement("a");
    // link.href = url.link;
    // link.target = "_blank";
    // link.setAttribute("_target", "blank");
    // link.download = url.fileName;
    // link.style.display = "block";
    // link.innerHTML = url.fileName;
    // document.body.appendChild(link);
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
    const { url, start, end } = this.state;
    return (
      <Container style={{ marginTop: "100 auto" }}>
        <Header as="h1">Series Download</Header>
        <Grid stackable columns={2}>
          <Grid.Row style={{ marginBottom: "100px" }}>
            <Grid.Column width={8}>
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
                  fluid
                  onClick={() => {
                    this.handleDownload();
                  }}
                  primary
                  disabled={url && start && end && start < end ? false : true}
                >
                  Get episodes
                </Button>
              </Form>
            </Grid.Column>

            <Grid.Column width={8}>{this.renderUrls()}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16} style={{ textAlign: "center" }}>
              <p>
                with <Icon name="heart" /> by israeladura{" "}
                <a href="https://twitter.com/aduraisrael">
                  <Icon name="twitter" />{" "}
                </a>
                |{" "}
                <a href="https://github/israeladura">
                  <Icon name="github" />{" "}
                </a>
              </p>
            </Grid.Column>
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
