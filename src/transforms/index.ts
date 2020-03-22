// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import * as ExerciseTransforms from './exercise'
import * as FigureTransforms from './figure'
import * as GlossaryTransforms from './glossary'
import * as MediaTransforms from './media'
import * as RuleTransforms from './rule'
import * as StructureTransforms from './structure'

export default {
    ...ExerciseTransforms,
    ...FigureTransforms,
    ...GlossaryTransforms,
    ...MediaTransforms,
    ...RuleTransforms,
    ...StructureTransforms,
}
