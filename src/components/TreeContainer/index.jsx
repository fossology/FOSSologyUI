/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com)

 SPDX-License-Identifier: GPL-2.0

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import Tree, { renderers } from "react-virtualized-tree";
import "./index.css";

const TreeContainer = ({ data }) => {
  const { Expandable } = renderers;
  const [state, setState] = useState(data);

  const handleChange = (nodes) => {
    setState(nodes);
  };

  return (
    <div>
      <div className="tree-list">
        <Tree nodes={state} onChange={handleChange}>
          {({ style, node, ...rest }) => (
            <div style={style}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Expandable node={node} {...rest}>
                {node.name}
              </Expandable>
            </div>
          )}
        </Tree>
      </div>
    </div>
  );
};

const treeDataFormat = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};
treeDataFormat.children = PropTypes.arrayOf(PropTypes.shape(treeDataFormat));
TreeContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(treeDataFormat)),
};

export default TreeContainer;
