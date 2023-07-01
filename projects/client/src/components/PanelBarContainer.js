import React from "react";
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { panelBarData } from "../data/appData";

export default class PanelBarContainer extends React.Component {
  imageUrl(imageName) {
    return "img/" + imageName + ".jpg";
  }
  render() {
    return (
      <PanelBar>
        <PanelBarItem expanded={true} title="My Teammates">
          <div className="teammates-row row justify-content-center">
            {panelBarData.teammates.map((item, idx) => (
              <div
                className={
                  idx === 0
                    ? "teammate k-state-selected text-center col-xs-12 col-sm-3 col-md-3 col-lg-12 col-xl-12"
                    : "teammate text-center col-xs-12 col-sm-3 col-md-3 col-lg-12 col-xl-12"
                }
                id={item.firstName + " " + item.lastName}
                key={idx}
              >
                <img src={this.imageUrl(item.firstName)} alt="" />
                <span className="mate-info">
                  <h2>{item.firstName + " " + item.lastName}</h2>
                  <p>{item.position}</p>
                </span>
              </div>
            ))}
          </div>
        </PanelBarItem>
        <PanelBarItem title={"Projects"}>
          <div className="d-flex">
            {panelBarData.salesReports.map((item, idx) => (
              <PanelBarItem
                className="col-xs-12 col-sm-6 col-md-3 col-lg-12 col-xl-12 text-xs-center text-md-center text-lg-left text-xl-left"
                title={item.title}
                key={idx}
              />
            ))}
          </div>
        </PanelBarItem>
        <PanelBarItem title="Communication" disabled={true} />
      </PanelBar>
    );
  }
}
