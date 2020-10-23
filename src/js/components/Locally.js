import React from 'react';

const script = document.createElement('script');
const embedStylesOverride = `
  #locally-root {
    margin-top: 30px;
  }
  #locally-root > #lcly-button-0 {
    width: 380px;
    margin: 0 auto;
  }
  .product__need-to-know__purchase-info { 
    height: auto !important;
  }
  .lcly-dealer-distance,
  .lcly-icon-marker {
    display: none;
  }
  .lcly-location-prompt-link {
    text-transform: lowercase;
    text-decoration: underline !important;
  }
    .lcly-location-prompt a {
      color: #000;
    }
    .lcly-location-prompt-link:before {
      content: "\\0028 ";
    }
    .lcly-location-prompt-link:after {
      content: "\\0029 ";
    }
    .lcly-location-prompt-label {
      text-transform: uppercase;
      color: #000;
      // font: normal normal 900 15px/17px Avenir LT Pro;
      font-size: 15px;
    }
  .lcly-location-switcher-wrap {
    height: 31px;
  }
    #lcly-location-switcher-0  {
      width: 80%;
      margin: 0 auto;
    }
    .lcly-location-switcher-input {
      height: 30px !important;
    }
    .lcly-location-switcher-b input {
      height: 30px;
      background: #000;
      color: #fff;
      font-size: 15px;
      text-transform: uppercase;
    }
    .lcly-location-switcher-a {
      padding-right: 5px;
    }
    .lcly-location-switcher-a .lcly-location-switcher-input {
      background: #fff;
      color: #000;
      border: 1px solid #000 !important;
    }
  .lcly-dealers-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lcly-dealer {
    width: 380px;
    padding: 0;
    border-radius: 0;
    outline: 1px solid #ccc;
    background: #fff;
    padding: 10px 0;
  }
  .lcly-dealer:hover {
      background: none;
      outline: 1px solid #000;
  }
    .lcly-dealer-name {
      position: relative;
      height: 30px;
      width: 100%;
      padding-left: 30px;
      max-width: 300px;
      margin: 0 auto;
      text-transform: uppercase;
      font-weight: normal;
      font-size: 15px;
      text-align: center;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
      .lcly-dealer-name:before {
        content: url('https://s3-us-west-2.amazonaws.com/images.arcteryx.com/virtual-advisor-callout/ArcPin_Icon.png');
        position: absolute;
        margin-left: -30px;

        // display: inline-block;
        // width: 25px; 
        // height: 29px;
        // content:"";
        // background-image: url('https://s3-us-west-2.amazonaws.com/images.arcteryx.com/locally/ArcPin_Icon.svg');
        // background-repeat: no-repeat;
        // transform: translateY(10px);
      }
    .lcly-location-prompt-label {
      font-weight: bold;
    }
    .lcly-location-features {
      display: flex;
      flex-direction: column;
    }
      .lcly-location-feature-primary,
      .lcly-location-feature-secondary,
      .lcly-location-feature-tertiary {
        font-size: 12px !important;
        text-transform: lowercase;
        color: #000;
      }
      .lcly-location-feature-primary:before,
      .lcly-location-feature-secondary:before,
      .lcly-location-feature-tertiary:before {
        display: inline-block;
        width: 10px; 
        height: 10px;
        content:"";
        background-image: url('http://images.arcteryx.com/foundation-ui/svgs/Success_Icon_Green.svg');
        background-repeat: no-repeat;
        transform: translate(-3px, 2px);
        color: green;
      }
      .lcly-location-feature-primary,
      .lcly-location-feature-secondary,
      .lcly-location-feature-tertiary {
        text-transform: capitalize;
      }
      .lcly-icon-check-mark {
        display: none;
      }
      .lcly-toggleable-0::first-letter {
        text-transform: uppercase;
      }
  .lcly-primary-trigger { 
    align-self: flex-end;
  }
  .lcly-primary-trigger {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 380px !important;
  }
  #lcly-link-0.lcly-anchor {
    padding-top: 7px;
    text-transform: capitalize;
  }
    #lcly-link-0.lcly-anchor:before {
      display: inline-block;
      width: 10px; 
      height: 15px;
      content:"";
      background-image: url('https://s3-us-west-2.amazonaws.com/images.arcteryx.com/locally/Pin_Icon.svg');
      background-repeat: no-repeat;
      transform: translate(-3px, 2px);
      color: #888888;
    }
  `;

export class Locally extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadLocallyWidget();
  }

  componentDidUpdate() {
    this.loadLocallyWidget();
  }

  loadLocallyWidget() {
    const lcly_config_0 = {
      "company_name": "Arc'teryx",
      "button_id": "HTML",
      "company_id": "31",
      "css": "4",
      "always_hide_button": "1",
      "upc": this.props.upc,
      "n_related_styles": "3",
      "show_location_switcher": "1",
      "show_location_prompt": "1",
      "lang": this.props.countryCode,
      "show_dealers": "1",
      "n_dealers": "3",
      "category": "arc",
      "show_only_upc_stocking_dealers": "1ç",
      "include_dealer_data": "1",
      "link_opens_modal": "1"
    };
    const lcly_query_0 = Object.keys(lcly_config_0)
      .reduce(function(a,k){a.push(encodeURIComponent(k) 
        + '=' 
        + encodeURIComponent(lcly_config_0[k]));return a},[]).join('&');
  
    script.src = 'https://Arcteryx.locally.com/stores/map.js?' + lcly_query_0;
    script.id = 'locally-widget';
    document.getElementById('locally-root').appendChild(script);
  };

  render() {
    return (
      <React.Fragment>
        <div id="lcly-button-0">
            <a id="lcly-link-0" href="https://brands.locally.com" target="_blank"></a>
        </div>
        <script id="lcly-script-0" async></script>
        <style dangerouslySetInnerHTML={{__html: embedStylesOverride}} />
      </React.Fragment>
    )
  }
}

export default Locally;

// import React, { useEffect, useRef, useState } from 'react';
// import makeAsyncScriptLoader from "react-async-script";

// export const Locally = props => {
//   const didMountRef = useRef(false);
//   const embedStylesOverride = `
//     #locally-root {
//       margin-top: 30px;
//     }
//     #locally-root > #lcly-button-0 {
//       width: 380px;
//       margin: 0 auto;
//     }
//     .product__need-to-know__purchase-info { 
//       height: auto !important;
//     }
//     .lcly-dealer-distance,
//     .lcly-icon-marker {
//       display: none;
//     }
//     .lcly-location-prompt-link {
//       text-transform: lowercase;
//       text-decoration: underline !important;
//     }
//       .lcly-location-prompt a {
//         color: #000;
//       }
//       .lcly-location-prompt-link:before {
//         content: "\\0028 ";
//       }
//       .lcly-location-prompt-link:after {
//         content: "\\0029 ";
//       }
//       .lcly-location-prompt-label {
//         text-transform: uppercase;
//         color: #000;
//         // font: normal normal 900 15px/17px Avenir LT Pro;
//         font-size: 15px;
//       }
//     .lcly-location-switcher-wrap {
//       height: 31px;
//     }
//       #lcly-location-switcher-0  {
//         width: 80%;
//         margin: 0 auto;
//       }
//       .lcly-location-switcher-input {
//         height: 30px !important;
//       }
//       .lcly-location-switcher-b input {
//         height: 30px;
//         background: #000;
//         color: #fff;
//         font-size: 15px;
//         text-transform: uppercase;
//       }
//       .lcly-location-switcher-a {
//         padding-right: 5px;
//       }
//       .lcly-location-switcher-a .lcly-location-switcher-input {
//         background: #fff;
//         color: #000;
//         border: 1px solid #000 !important;
//       }
//     .lcly-dealers-wrap {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//     }
//     .lcly-dealer {
//       width: 380px;
//       padding: 0;
//       border-radius: 0;
//       outline: 1px solid #ccc;
//       background: #fff;
//       padding: 10px 0;
//     }
//     .lcly-dealer:hover {
//         background: none;
//         outline: 1px solid #000;
//     }
//       .lcly-dealer-name {
//         position: relative;
//         height: 30px;
//         width: 100%;
//         padding-left: 30px;
//         max-width: 300px;
//         margin: 0 auto;
//         text-transform: uppercase;
//         font-weight: normal;
//         font-size: 15px;
//         text-align: center;
//         line-height: 1.5;
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;
//       }
//         .lcly-dealer-name:before {
//           content: url('https://s3-us-west-2.amazonaws.com/images.arcteryx.com/virtual-advisor-callout/ArcPin_Icon.png');
//           position: absolute;
//           margin-left: -30px;

//           // display: inline-block;
//           // width: 25px; 
//           // height: 29px;
//           // content:"";
//           // background-image: url('https://s3-us-west-2.amazonaws.com/images.arcteryx.com/locally/ArcPin_Icon.svg');
//           // background-repeat: no-repeat;
//           // transform: translateY(10px);
//         }
//       .lcly-location-prompt-label {
//         font-weight: bold;
//       }
//       .lcly-location-features {
//         display: flex;
//         flex-direction: column;
//       }
//         .lcly-location-feature-primary,
//         .lcly-location-feature-secondary,
//         .lcly-location-feature-tertiary {
//           font-size: 12px !important;
//           text-transform: lowercase;
//           color: #000;
//         }
//         .lcly-location-feature-primary:before,
//         .lcly-location-feature-secondary:before,
//         .lcly-location-feature-tertiary:before {
//           display: inline-block;
//           width: 10px; 
//           height: 10px;
//           content:"";
//           background-image: url('http://images.arcteryx.com/foundation-ui/svgs/Success_Icon_Green.svg');
//           background-repeat: no-repeat;
//           transform: translate(-3px, 2px);
//           color: green;
//         }
//         .lcly-location-feature-primary,
//         .lcly-location-feature-secondary,
//         .lcly-location-feature-tertiary {
//           text-transform: capitalize;
//         }
//         .lcly-icon-check-mark {
//           display: none;
//         }
//         .lcly-toggleable-0::first-letter {
//           text-transform: uppercase;
//         }
//     .lcly-primary-trigger { 
//       align-self: flex-end;
//     }
//     .lcly-primary-trigger {
//       position: absolute;
//       bottom: 0;
//       right: 0;
//       width: 380px !important;
//     }
//     #lcly-link-0.lcly-anchor {
//       padding-top: 7px;
//       text-transform: capitalize;
//     }
//       #lcly-link-0.lcly-anchor:before {
//         display: inline-block;
//         width: 10px; 
//         height: 15px;
//         content:"";
//         background-image: url('https://s3-us-west-2.amazonaws.com/images.arcteryx.com/locally/Pin_Icon.svg');
//         background-repeat: no-repeat;
//         transform: translate(-3px, 2px);
//         color: #888888;
//       }
//   `;

//   const LclyScriptEl = props =>  {
//     return <script id="lcly-script-0" src={props.src} async></script>;
//   }

//   const buildWidgetEndpoint = (upc, countryCode) => {
//     // LOCALLY.COM WIDGET EMBED CODE 
//     const lcly_config_0 = {
//       "company_name": "Arc'teryx",
//       "button_id": "HTML",
//       "company_id": "31",
//       "css": "4",
//       "always_hide_button": "1",
//       "upc": upc,
//       "n_related_styles": "3",
//       "show_location_switcher": "1",
//       "show_location_prompt": "1",
//       "lang": countryCode,
//       "show_dealers": "1",
//       "n_dealers": "3",
//       "category": "arc",
//       "show_only_upc_stocking_dealers": "1ç",
//       "include_dealer_data": "1",
//       "link_opens_modal": "1"
//     };
//     const lcly_query_0 = Object.keys(lcly_config_0)
//       .reduce(function(a,k){a.push(encodeURIComponent(k) 
//         + '=' 
//         + encodeURIComponent(lcly_config_0[k]));return a},[]).join('&');
//     return 'https://Arcteryx.locally.com/stores/map.js?' + lcly_query_0;
//   }
//   const [AsyncScriptComponent, setAsyncScriptComponent] = useState(
//       makeAsyncScriptLoader(buildWidgetEndpoint(props.upc, props.countryCode), { removeOnUnmount: true })(LclyScriptEl)
//     );

//   useEffect(() => {
//     if (didMountRef.current) 
//       setAsyncScriptComponent(makeAsyncScriptLoader(buildWidgetEndpoint(props.upc, props.countryCode), { removeOnUnmount: true })(LclyScriptEl));
//     else
//       didMountRef.current = true;
//   }, []); // TODO: add props here?

//   return props.upc && (
//     <React.Fragment>
//       <div id="lcly-button-0">
//         <a id="lcly-link-0" href="https://brands.locally.com" target="_blank"></a>
//       </div>
//       <AsyncScriptComponent src={buildWidgetEndpoint()} />
//       <style dangerouslySetInnerHTML={{__html: embedStylesOverride}} />
//     </React.Fragment>
//   )
// }

// export default Locally;