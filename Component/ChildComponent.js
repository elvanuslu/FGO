class ChildComponent extends Component {
  sendMessage = () => {
    const {websocket} = this.props;
    try {
      websocket.send(data); //send data to the server
    } catch (error) {
      console.log(error); // catch error
    }
  };
  render() {
    return <div>........</div>;
  }
}

export default ChildComponent;
