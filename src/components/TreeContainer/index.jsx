/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)

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

"use client";
import React from "react";
import PropTypes from "prop-types";
import { Tree } from "react-arborist";
import "./index.css";

const TreeContainer = ({ data, handleClick }) => {
  return (
    <div className="tree-list" style={{ height: "100%", width: "100%" }}>
      <Tree
        data={data}
        openByDefault={true}
        disableDrag
        height={400}
        width={"100%"}
        indent={24}
        rowHeight={40}
        onSelect={(node) => handleClick(null, node.id)}
      >
        {({ node, style }) => (
          <div
            style={style}
            className="folder-tree-list text-primary-color"
          >
            {node.data.name}
          </div>
        )}
      </Tree>
    </div>
  );
};

const treeDataFormat = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  children: PropTypes.array,
};
TreeContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(treeDataFormat)),
  handleClick: PropTypes.func.isRequired,
};

export default TreeContainer;
