import * as React from 'react';
import * as strings from 'hubLinksStrings';
import { IHubLinksItem } from '../../IHubLinksItem';
import { IHubLinksLayout } from "../HubLinksLayout";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import HubLinksWebPart from "../../HubLinks";
import ilStyles from './ILStyles.module.scss';

export default class BasicHorizontalTitleLayout implements IHubLinksLayout{
  constructor(webpart:HubLinksWebPart){
    this.webpart = webpart;
  }
  
  private _webpart : HubLinksWebPart;
  public get webpart() : HubLinksWebPart {
    return this._webpart;
  }
  public set webpart(v : HubLinksWebPart) {
    this._webpart = v;
  }
  
  public render(items:IHubLinksItem[], isEditMode: boolean):JSX.Element{
    return (
      <ul className={ilStyles["hubLinks"] + " " + ilStyles["blue"] + (this.webpart.props.isEdit? " " + ilStyles["edit"] : "")}>
        { items &&
            items.map((item) => {
              return (
                <li key={"item-"+items.indexOf(item)} role="link" id={"item-"+items.indexOf(item)} 
                      draggable={isEditMode} onDragStart={this.webpart.startDrag.bind(this.webpart)} 
                      onMouseDown={this.webpart.mouseDragDown.bind(this.webpart)} onDragEnter={this.webpart.moveItem.bind(this.webpart)} 
                      onDragEnd={this.webpart.endDrag.bind(this.webpart)} data-index={items.indexOf(item)}>
                    <i className={"fa " + item.Icon + " " + ilStyles["faIcon"]} aria-hidden="true"/>
                    <a className={ilStyles["linktitle"]} href={item.URL} target={item.NewTab ? "_blank" : ""}>{item.Title}</a>
                    <p className={ilStyles["linkdescription"]}>{item.Description}</p>                    
                    {isEditMode &&
                      <div className={ilStyles["editControls"]}>
                          <DefaultButton icon="Clear" onClick={this.webpart.deleteBox.bind(this.webpart)} className={ilStyles["right-button"]}/>
                          <DefaultButton icon="Edit" onClick={this.webpart.editBox.bind(this.webpart)} className={ilStyles["right-button"]}/>
                          <i className={"ms-Icon ms-Icon--Move "+ilStyles["left-button"]} id="drag-handle" aria-hidden="true"></i>
                      </div>
                    }
                </li>
              );
            })
        }
        { (!items || items.length < 1) && isEditMode &&
          Array.apply(null,Array(1-(items ? items.length : 0))).map((o,i)=>{
            return(
              <li className={"col-md-4 "+ilStyles["emptyBox"]}>
                <div role="button" onClick={this.webpart.openLinkPicker.bind(this.webpart)}>{strings.PlaceholderButtonText}</div>
              </li>
            );
          })
        }        
      </ul>
    );
  }
}