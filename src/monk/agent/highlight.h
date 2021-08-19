/*
Author: Daniele Fognini, Andreas Wuerl
Copyright (C) 2013-2014, Siemens AG

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

#ifndef MONK_AGENT_HIGHLIGHT_H
#define MONK_AGENT_HIGHLIGHT_H

#include <glib.h>
#include "diff.h"

void convertToAbsolutePositions(GArray* diffMatchInfo,
                                GArray* textTokens,
                                GArray* searchTokens);

DiffPoint getFullHighlightFor(const GArray* tokens, size_t firstMatchedIndex, size_t matchedCount);

#endif // MONK_AGENT_HIGHLIGHT_H