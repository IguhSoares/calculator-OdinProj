const msg = {
  msgArea: document.getElementById('msg-area'),
  set area(element) {
    this.msgArea = element;
  },
  get area() {
    return this.msgArea;
  },
  show() {
    this.msgArea.classList.remove('hide');
    this.msgArea.classList.add('show');
  },
  hide() {
    this.msgArea.classList.remove('show');
    this.msgArea.classList.add('hide');
  },
  display(message) {
    this.msgArea.innerText = message;
    this.show();
    setTimeout(() => {
      this.hide();
    }, 2000);
  },
};

export default msg;
