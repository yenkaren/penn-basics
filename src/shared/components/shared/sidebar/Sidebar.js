import React, {Component} from 'react';
import SidebarSection from './SidebarSection';

class Sidebar extends Component {
  render(){
    const sections = [
      {
        "title": "Open now",
        "links": [
          {
            "name": "1920 Commons",
            "isOpen": true,
          },
          {
            "name": "Hill",
            "isOpen": true,
          },
        ],
      },
      {
        "title": "Closed",
        "links": [
          {
            "name": "Kings Court",
            "isOpen": false,
          },
          {
            "name": "New College House",
            "isOpen": false,
          },
          {
            "name": "Bridge",
            "isOpen": false,
          },
        ],
      }
    ]

    const content = sections.map((section) => {
      return <SidebarSection title={section.title} links={section.links} />;
    });

    return(
      <div className="sidebar" id="sidebar">
        { content }
      </div>
    )
  }
}

export default Sidebar;
