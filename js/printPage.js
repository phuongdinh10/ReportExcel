function closePrint() {
    document.body.removeChild(this.__container__);
  }

  function setPrint() {
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.focus(); // Required for IE
    this.contentWindow.print();
  }

  function printPage(sURL) {
    const hideFrame = document.createElement("iframe");
    hideFrame.onload = setPrint;
    hideFrame.style.position = "fixed";
    hideFrame.style.right = "0";
    hideFrame.style.bottom = "0";
    hideFrame.style.width = "0";
    hideFrame.style.height = "0";
    hideFrame.style.border = "0";
    hideFrame.src = sURL;
    document.body.appendChild(hideFrame);
  }