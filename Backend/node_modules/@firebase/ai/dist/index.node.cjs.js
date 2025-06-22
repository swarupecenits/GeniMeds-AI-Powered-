'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var app = require('@firebase/app');
var component = require('@firebase/component');
var util = require('@firebase/util');
var logger$1 = require('@firebase/logger');
var tslib = require('tslib');

var name = "@firebase/ai";
var version = "1.4.0";

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const AI_TYPE = 'AI';
const DEFAULT_LOCATION = 'us-central1';
const DEFAULT_BASE_URL = 'https://firebasevertexai.googleapis.com';
const DEFAULT_API_VERSION = 'v1beta';
const PACKAGE_VERSION = version;
const LANGUAGE_TAG = 'gl-js';
const DEFAULT_FETCH_TIMEOUT_MS = 180 * 1000;

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Possible roles.
 * @public
 */
const POSSIBLE_ROLES = ['user', 'model', 'function', 'system'];
/**
 * Harm categories that would cause prompts or candidates to be blocked.
 * @public
 */
exports.HarmCategory = void 0;
(function (HarmCategory) {
    HarmCategory["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
    HarmCategory["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
    HarmCategory["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
    HarmCategory["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
})(exports.HarmCategory || (exports.HarmCategory = {}));
/**
 * Threshold above which a prompt or candidate will be blocked.
 * @public
 */
exports.HarmBlockThreshold = void 0;
(function (HarmBlockThreshold) {
    /**
     * Content with `NEGLIGIBLE` will be allowed.
     */
    HarmBlockThreshold["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
    /**
     * Content with `NEGLIGIBLE` and `LOW` will be allowed.
     */
    HarmBlockThreshold["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
    /**
     * Content with `NEGLIGIBLE`, `LOW`, and `MEDIUM` will be allowed.
     */
    HarmBlockThreshold["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
    /**
     * All content will be allowed.
     */
    HarmBlockThreshold["BLOCK_NONE"] = "BLOCK_NONE";
    /**
     * All content will be allowed. This is the same as `BLOCK_NONE`, but the metadata corresponding
     * to the {@link HarmCategory} will not be present in the response.
     */
    HarmBlockThreshold["OFF"] = "OFF";
})(exports.HarmBlockThreshold || (exports.HarmBlockThreshold = {}));
/**
 * This property is not supported in the Gemini Developer API ({@link GoogleAIBackend}).
 *
 * @public
 */
exports.HarmBlockMethod = void 0;
(function (HarmBlockMethod) {
    /**
     * The harm block method uses both probability and severity scores.
     */
    HarmBlockMethod["SEVERITY"] = "SEVERITY";
    /**
     * The harm block method uses the probability score.
     */
    HarmBlockMethod["PROBABILITY"] = "PROBABILITY";
})(exports.HarmBlockMethod || (exports.HarmBlockMethod = {}));
/**
 * Probability that a prompt or candidate matches a harm category.
 * @public
 */
exports.HarmProbability = void 0;
(function (HarmProbability) {
    /**
     * Content has a negligible chance of being unsafe.
     */
    HarmProbability["NEGLIGIBLE"] = "NEGLIGIBLE";
    /**
     * Content has a low chance of being unsafe.
     */
    HarmProbability["LOW"] = "LOW";
    /**
     * Content has a medium chance of being unsafe.
     */
    HarmProbability["MEDIUM"] = "MEDIUM";
    /**
     * Content has a high chance of being unsafe.
     */
    HarmProbability["HIGH"] = "HIGH";
})(exports.HarmProbability || (exports.HarmProbability = {}));
/**
 * Harm severity levels.
 * @public
 */
exports.HarmSeverity = void 0;
(function (HarmSeverity) {
    /**
     * Negligible level of harm severity.
     */
    HarmSeverity["HARM_SEVERITY_NEGLIGIBLE"] = "HARM_SEVERITY_NEGLIGIBLE";
    /**
     * Low level of harm severity.
     */
    HarmSeverity["HARM_SEVERITY_LOW"] = "HARM_SEVERITY_LOW";
    /**
     * Medium level of harm severity.
     */
    HarmSeverity["HARM_SEVERITY_MEDIUM"] = "HARM_SEVERITY_MEDIUM";
    /**
     * High level of harm severity.
     */
    HarmSeverity["HARM_SEVERITY_HIGH"] = "HARM_SEVERITY_HIGH";
    /**
     * Harm severity is not supported.
     *
     * @remarks
     * The GoogleAI backend does not support `HarmSeverity`, so this value is used as a fallback.
     */
    HarmSeverity["HARM_SEVERITY_UNSUPPORTED"] = "HARM_SEVERITY_UNSUPPORTED";
})(exports.HarmSeverity || (exports.HarmSeverity = {}));
/**
 * Reason that a prompt was blocked.
 * @public
 */
exports.BlockReason = void 0;
(function (BlockReason) {
    /**
     * Content was blocked by safety settings.
     */
    BlockReason["SAFETY"] = "SAFETY";
    /**
     * Content was blocked, but the reason is uncategorized.
     */
    BlockReason["OTHER"] = "OTHER";
    /**
     * Content was blocked because it contained terms from the terminology blocklist.
     */
    BlockReason["BLOCKLIST"] = "BLOCKLIST";
    /**
     * Content was blocked due to prohibited content.
     */
    BlockReason["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
})(exports.BlockReason || (exports.BlockReason = {}));
/**
 * Reason that a candidate finished.
 * @public
 */
exports.FinishReason = void 0;
(function (FinishReason) {
    /**
     * Natural stop point of the model or provided stop sequence.
     */
    FinishReason["STOP"] = "STOP";
    /**
     * The maximum number of tokens as specified in the request was reached.
     */
    FinishReason["MAX_TOKENS"] = "MAX_TOKENS";
    /**
     * The candidate content was flagged for safety reasons.
     */
    FinishReason["SAFETY"] = "SAFETY";
    /**
     * The candidate content was flagged for recitation reasons.
     */
    FinishReason["RECITATION"] = "RECITATION";
    /**
     * Unknown reason.
     */
    FinishReason["OTHER"] = "OTHER";
    /**
     * The candidate content contained forbidden terms.
     */
    FinishReason["BLOCKLIST"] = "BLOCKLIST";
    /**
     * The candidate content potentially contained prohibited content.
     */
    FinishReason["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
    /**
     * The candidate content potentially contained Sensitive Personally Identifiable Information (SPII).
     */
    FinishReason["SPII"] = "SPII";
    /**
     * The function call generated by the model was invalid.
     */
    FinishReason["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
})(exports.FinishReason || (exports.FinishReason = {}));
/**
 * @public
 */
exports.FunctionCallingMode = void 0;
(function (FunctionCallingMode) {
    /**
     * Default model behavior; model decides to predict either a function call
     * or a natural language response.
     */
    FunctionCallingMode["AUTO"] = "AUTO";
    /**
     * Model is constrained to always predicting a function call only.
     * If `allowed_function_names` is set, the predicted function call will be
     * limited to any one of `allowed_function_names`, else the predicted
     * function call will be any one of the provided `function_declarations`.
     */
    FunctionCallingMode["ANY"] = "ANY";
    /**
     * Model will not predict any function call. Model behavior is same as when
     * not passing any function declarations.
     */
    FunctionCallingMode["NONE"] = "NONE";
})(exports.FunctionCallingMode || (exports.FunctionCallingMode = {}));
/**
 * Content part modality.
 * @public
 */
exports.Modality = void 0;
(function (Modality) {
    /**
     * Unspecified modality.
     */
    Modality["MODALITY_UNSPECIFIED"] = "MODALITY_UNSPECIFIED";
    /**
     * Plain text.
     */
    Modality["TEXT"] = "TEXT";
    /**
     * Image.
     */
    Modality["IMAGE"] = "IMAGE";
    /**
     * Video.
     */
    Modality["VIDEO"] = "VIDEO";
    /**
     * Audio.
     */
    Modality["AUDIO"] = "AUDIO";
    /**
     * Document (for example, PDF).
     */
    Modality["DOCUMENT"] = "DOCUMENT";
})(exports.Modality || (exports.Modality = {}));
/**
 * Generation modalities to be returned in generation responses.
 *
 * @beta
 */
const ResponseModality = {
    /**
     * Text.
     * @beta
     */
    TEXT: 'TEXT',
    /**
     * Image.
     * @beta
     */
    IMAGE: 'IMAGE'
};

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Contains the list of OpenAPI data types
 * as defined by the
 * {@link https://swagger.io/docs/specification/data-models/data-types/ | OpenAPI specification}
 * @public
 */
exports.SchemaType = void 0;
(function (SchemaType) {
    /** String type. */
    SchemaType["STRING"] = "string";
    /** Number type. */
    SchemaType["NUMBER"] = "number";
    /** Integer type. */
    SchemaType["INTEGER"] = "integer";
    /** Boolean type. */
    SchemaType["BOOLEAN"] = "boolean";
    /** Array type. */
    SchemaType["ARRAY"] = "array";
    /** Object type. */
    SchemaType["OBJECT"] = "object";
})(exports.SchemaType || (exports.SchemaType = {}));

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A filter level controlling how aggressively to filter sensitive content.
 *
 * Text prompts provided as inputs and images (generated or uploaded) through Imagen on Vertex AI
 * are assessed against a list of safety filters, which include 'harmful categories' (for example,
 * `violence`, `sexual`, `derogatory`, and `toxic`). This filter level controls how aggressively to
 * filter out potentially harmful content from responses. See the {@link http://firebase.google.com/docs/vertex-ai/generate-images | documentation }
 * and the {@link https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#safety-filters | Responsible AI and usage guidelines}
 * for more details.
 *
 * @beta
 */
exports.ImagenSafetyFilterLevel = void 0;
(function (ImagenSafetyFilterLevel) {
    /**
     * The most aggressive filtering level; most strict blocking.
     */
    ImagenSafetyFilterLevel["BLOCK_LOW_AND_ABOVE"] = "block_low_and_above";
    /**
     * Blocks some sensitive prompts and responses.
     */
    ImagenSafetyFilterLevel["BLOCK_MEDIUM_AND_ABOVE"] = "block_medium_and_above";
    /**
     * Blocks few sensitive prompts and responses.
     */
    ImagenSafetyFilterLevel["BLOCK_ONLY_HIGH"] = "block_only_high";
    /**
     * The least aggressive filtering level; blocks very few sensitive prompts and responses.
     *
     * Access to this feature is restricted and may require your case to be reviewed and approved by
     * Cloud support.
     */
    ImagenSafetyFilterLevel["BLOCK_NONE"] = "block_none";
})(exports.ImagenSafetyFilterLevel || (exports.ImagenSafetyFilterLevel = {}));
/**
 * A filter level controlling whether generation of images containing people or faces is allowed.
 *
 * See the <a href="http://firebase.google.com/docs/vertex-ai/generate-images">personGeneration</a>
 * documentation for more details.
 *
 * @beta
 */
exports.ImagenPersonFilterLevel = void 0;
(function (ImagenPersonFilterLevel) {
    /**
     * Disallow generation of images containing people or faces; images of people are filtered out.
     */
    ImagenPersonFilterLevel["BLOCK_ALL"] = "dont_allow";
    /**
     * Allow generation of images containing adults only; images of children are filtered out.
     *
     * Generation of images containing people or faces may require your use case to be
     * reviewed and approved by Cloud support; see the {@link https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#person-face-gen | Responsible AI and usage guidelines}
     * for more details.
     */
    ImagenPersonFilterLevel["ALLOW_ADULT"] = "allow_adult";
    /**
     * Allow generation of images containing adults only; images of children are filtered out.
     *
     * Generation of images containing people or faces may require your use case to be
     * reviewed and approved by Cloud support; see the {@link https://cloud.google.com/vertex-ai/generative-ai/docs/image/responsible-ai-imagen#person-face-gen | Responsible AI and usage guidelines}
     * for more details.
     */
    ImagenPersonFilterLevel["ALLOW_ALL"] = "allow_all";
})(exports.ImagenPersonFilterLevel || (exports.ImagenPersonFilterLevel = {}));
/**
 * Aspect ratios for Imagen images.
 *
 * To specify an aspect ratio for generated images, set the `aspectRatio` property in your
 * {@link ImagenGenerationConfig}.
 *
 * See the the {@link http://firebase.google.com/docs/vertex-ai/generate-images | documentation }
 * for more details and examples of the supported aspect ratios.
 *
 * @beta
 */
exports.ImagenAspectRatio = void 0;
(function (ImagenAspectRatio) {
    /**
     * Square (1:1) aspect ratio.
     */
    ImagenAspectRatio["SQUARE"] = "1:1";
    /**
     * Landscape (3:4) aspect ratio.
     */
    ImagenAspectRatio["LANDSCAPE_3x4"] = "3:4";
    /**
     * Portrait (4:3) aspect ratio.
     */
    ImagenAspectRatio["PORTRAIT_4x3"] = "4:3";
    /**
     * Landscape (16:9) aspect ratio.
     */
    ImagenAspectRatio["LANDSCAPE_16x9"] = "16:9";
    /**
     * Portrait (9:16) aspect ratio.
     */
    ImagenAspectRatio["PORTRAIT_9x16"] = "9:16";
})(exports.ImagenAspectRatio || (exports.ImagenAspectRatio = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * An enum-like object containing constants that represent the supported backends
 * for the Firebase AI SDK.
 * This determines which backend service (Vertex AI Gemini API or Gemini Developer API)
 * the SDK will communicate with.
 *
 * These values are assigned to the `backendType` property within the specific backend
 * configuration objects ({@link GoogleAIBackend} or {@link VertexAIBackend}) to identify
 * which service to target.
 *
 * @public
 */
const BackendType = {
    /**
     * Identifies the backend service for the Vertex AI Gemini API provided through Google Cloud.
     * Use this constant when creating a {@link VertexAIBackend} configuration.
     */
    VERTEX_AI: 'VERTEX_AI',
    /**
     * Identifies the backend service for the Gemini Developer API ({@link https://ai.google/ | Google AI}).
     * Use this constant when creating a {@link GoogleAIBackend} configuration.
     */
    GOOGLE_AI: 'GOOGLE_AI'
}; // Using 'as const' makes the string values literal types

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Abstract base class representing the configuration for an AI service backend.
 * This class should not be instantiated directly. Use its subclasses; {@link GoogleAIBackend} for
 * the Gemini Developer API (via {@link https://ai.google/ | Google AI}), and
 * {@link VertexAIBackend} for the Vertex AI Gemini API.
 *
 * @public
 */
class Backend {
    /**
     * Protected constructor for use by subclasses.
     * @param type - The backend type.
     */
    constructor(type) {
        this.backendType = type;
    }
}
/**
 * Configuration class for the Gemini Developer API.
 *
 * Use this with {@link AIOptions} when initializing the AI service via
 * {@link getAI | getAI()} to specify the Gemini Developer API as the backend.
 *
 * @public
 */
class GoogleAIBackend extends Backend {
    /**
     * Creates a configuration object for the Gemini Developer API backend.
     */
    constructor() {
        super(BackendType.GOOGLE_AI);
    }
}
/**
 * Configuration class for the Vertex AI Gemini API.
 *
 * Use this with {@link AIOptions} when initializing the AI service via
 * {@link getAI | getAI()} to specify the Vertex AI Gemini API as the backend.
 *
 * @public
 */
class VertexAIBackend extends Backend {
    /**
     * Creates a configuration object for the Vertex AI backend.
     *
     * @param location - The region identifier, defaulting to `us-central1`;
     * see {@link https://firebase.google.com/docs/vertex-ai/locations#available-locations | Vertex AI locations}
     * for a list of supported locations.
     */
    constructor(location = DEFAULT_LOCATION) {
        super(BackendType.VERTEX_AI);
        if (!location) {
            this.location = DEFAULT_LOCATION;
        }
        else {
            this.location = location;
        }
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AIService {
    constructor(app, backend, authProvider, appCheckProvider) {
        this.app = app;
        this.backend = backend;
        const appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({ optional: true });
        const auth = authProvider === null || authProvider === void 0 ? void 0 : authProvider.getImmediate({ optional: true });
        this.auth = auth || null;
        this.appCheck = appCheck || null;
        if (backend instanceof VertexAIBackend) {
            this.location = backend.location;
        }
        else {
            this.location = '';
        }
    }
    _delete() {
        return Promise.resolve();
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Error class for the Firebase AI SDK.
 *
 * @public
 */
class AIError extends util.FirebaseError {
    /**
     * Constructs a new instance of the `AIError` class.
     *
     * @param code - The error code from {@link AIErrorCode}.
     * @param message - A human-readable message describing the error.
     * @param customErrorData - Optional error data.
     */
    constructor(code, message, customErrorData) {
        // Match error format used by FirebaseError from ErrorFactory
        const service = AI_TYPE;
        const fullCode = `${service}/${code}`;
        const fullMessage = `${service}: ${message} (${fullCode})`;
        super(code, fullMessage);
        this.code = code;
        this.customErrorData = customErrorData;
        // FirebaseError initializes a stack trace, but it assumes the error is created from the error
        // factory. Since we break this assumption, we set the stack trace to be originating from this
        // constructor.
        // This is only supported in V8.
        if (Error.captureStackTrace) {
            // Allows us to initialize the stack trace without including the constructor itself at the
            // top level of the stack trace.
            Error.captureStackTrace(this, AIError);
        }
        // Allows instanceof AIError in ES5/ES6
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // TODO(dlarocque): Replace this with `new.target`: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
        //                   which we can now use since we no longer target ES5.
        Object.setPrototypeOf(this, AIError.prototype);
        // Since Error is an interface, we don't inherit toString and so we define it ourselves.
        this.toString = () => fullMessage;
    }
}

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Encodes a {@link Backend} into a string that will be used to uniquely identify {@link AI}
 * instances by backend type.
 *
 * @internal
 */
function encodeInstanceIdentifier(backend) {
    if (backend instanceof GoogleAIBackend) {
        return `${AI_TYPE}/googleai`;
    }
    else if (backend instanceof VertexAIBackend) {
        return `${AI_TYPE}/vertexai/${backend.location}`;
    }
    else {
        throw new AIError("error" /* AIErrorCode.ERROR */, `Invalid backend: ${JSON.stringify(backend.backendType)}`);
    }
}
/**
 * Decodes an instance identifier string into a {@link Backend}.
 *
 * @internal
 */
function decodeInstanceIdentifier(instanceIdentifier) {
    const identifierParts = instanceIdentifier.split('/');
    if (identifierParts[0] !== AI_TYPE) {
        throw new AIError("error" /* AIErrorCode.ERROR */, `Invalid instance identifier, unknown prefix '${identifierParts[0]}'`);
    }
    const backendType = identifierParts[1];
    switch (backendType) {
        case 'vertexai':
            const location = identifierParts[2];
            if (!location) {
                throw new AIError("error" /* AIErrorCode.ERROR */, `Invalid instance identifier, unknown location '${instanceIdentifier}'`);
            }
            return new VertexAIBackend(location);
        case 'googleai':
            return new GoogleAIBackend();
        default:
            throw new AIError("error" /* AIErrorCode.ERROR */, `Invalid instance identifier string: '${instanceIdentifier}'`);
    }
}

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Base class for Firebase AI model APIs.
 *
 * Instances of this class are associated with a specific Firebase AI {@link Backend}
 * and provide methods for interacting with the configured generative model.
 *
 * @public
 */
class AIModel {
    /**
     * Constructs a new instance of the {@link AIModel} class.
     *
     * This constructor should only be called from subclasses that provide
     * a model API.
     *
     * @param ai - an {@link AI} instance.
     * @param modelName - The name of the model being used. It can be in one of the following formats:
     * - `my-model` (short name, will resolve to `publishers/google/models/my-model`)
     * - `models/my-model` (will resolve to `publishers/google/models/my-model`)
     * - `publishers/my-publisher/models/my-model` (fully qualified model name)
     *
     * @throws If the `apiKey` or `projectId` fields are missing in your
     * Firebase config.
     *
     * @internal
     */
    constructor(ai, modelName) {
        var _a, _b, _c, _d, _e, _f;
        if (!((_b = (_a = ai.app) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.apiKey)) {
            throw new AIError("no-api-key" /* AIErrorCode.NO_API_KEY */, `The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.`);
        }
        else if (!((_d = (_c = ai.app) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.projectId)) {
            throw new AIError("no-project-id" /* AIErrorCode.NO_PROJECT_ID */, `The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.`);
        }
        else if (!((_f = (_e = ai.app) === null || _e === void 0 ? void 0 : _e.options) === null || _f === void 0 ? void 0 : _f.appId)) {
            throw new AIError("no-app-id" /* AIErrorCode.NO_APP_ID */, `The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.`);
        }
        else {
            this._apiSettings = {
                apiKey: ai.app.options.apiKey,
                project: ai.app.options.projectId,
                appId: ai.app.options.appId,
                automaticDataCollectionEnabled: ai.app.automaticDataCollectionEnabled,
                location: ai.location,
                backend: ai.backend
            };
            if (app._isFirebaseServerApp(ai.app) && ai.app.settings.appCheckToken) {
                const token = ai.app.settings.appCheckToken;
                this._apiSettings.getAppCheckToken = () => {
                    return Promise.resolve({ token });
                };
            }
            else if (ai.appCheck) {
                this._apiSettings.getAppCheckToken = () => ai.appCheck.getToken();
            }
            if (ai.auth) {
                this._apiSettings.getAuthToken = () => ai.auth.getToken();
            }
            this.model = AIModel.normalizeModelName(modelName, this._apiSettings.backend.backendType);
        }
    }
    /**
     * Normalizes the given model name to a fully qualified model resource name.
     *
     * @param modelName - The model name to normalize.
     * @returns The fully qualified model resource name.
     *
     * @internal
     */
    static normalizeModelName(modelName, backendType) {
        if (backendType === BackendType.GOOGLE_AI) {
            return AIModel.normalizeGoogleAIModelName(modelName);
        }
        else {
            return AIModel.normalizeVertexAIModelName(modelName);
        }
    }
    /**
     * @internal
     */
    static normalizeGoogleAIModelName(modelName) {
        return `models/${modelName}`;
    }
    /**
     * @internal
     */
    static normalizeVertexAIModelName(modelName) {
        let model;
        if (modelName.includes('/')) {
            if (modelName.startsWith('models/')) {
                // Add 'publishers/google' if the user is only passing in 'models/model-name'.
                model = `publishers/google/${modelName}`;
            }
            else {
                // Any other custom format (e.g. tuned models) must be passed in correctly.
                model = modelName;
            }
        }
        else {
            // If path is not included, assume it's a non-tuned model.
            model = `publishers/google/models/${modelName}`;
        }
        return model;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new logger$1.Logger('@firebase/vertexai');

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Task;
(function (Task) {
    Task["GENERATE_CONTENT"] = "generateContent";
    Task["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
    Task["COUNT_TOKENS"] = "countTokens";
    Task["PREDICT"] = "predict";
})(Task || (Task = {}));
class RequestUrl {
    constructor(model, task, apiSettings, stream, requestOptions) {
        this.model = model;
        this.task = task;
        this.apiSettings = apiSettings;
        this.stream = stream;
        this.requestOptions = requestOptions;
    }
    toString() {
        const url = new URL(this.baseUrl); // Throws if the URL is invalid
        url.pathname = `/${this.apiVersion}/${this.modelPath}:${this.task}`;
        url.search = this.queryParams.toString();
        return url.toString();
    }
    get baseUrl() {
        var _a;
        return ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.baseUrl) || DEFAULT_BASE_URL;
    }
    get apiVersion() {
        return DEFAULT_API_VERSION; // TODO: allow user-set options if that feature becomes available
    }
    get modelPath() {
        if (this.apiSettings.backend instanceof GoogleAIBackend) {
            return `projects/${this.apiSettings.project}/${this.model}`;
        }
        else if (this.apiSettings.backend instanceof VertexAIBackend) {
            return `projects/${this.apiSettings.project}/locations/${this.apiSettings.backend.location}/${this.model}`;
        }
        else {
            throw new AIError("error" /* AIErrorCode.ERROR */, `Invalid backend: ${JSON.stringify(this.apiSettings.backend)}`);
        }
    }
    get queryParams() {
        const params = new URLSearchParams();
        if (this.stream) {
            params.set('alt', 'sse');
        }
        return params;
    }
}
/**
 * Log language and "fire/version" to x-goog-api-client
 */
function getClientHeaders() {
    const loggingTags = [];
    loggingTags.push(`${LANGUAGE_TAG}/${PACKAGE_VERSION}`);
    loggingTags.push(`fire/${PACKAGE_VERSION}`);
    return loggingTags.join(' ');
}
async function getHeaders(url) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-goog-api-client', getClientHeaders());
    headers.append('x-goog-api-key', url.apiSettings.apiKey);
    if (url.apiSettings.automaticDataCollectionEnabled) {
        headers.append('X-Firebase-Appid', url.apiSettings.appId);
    }
    if (url.apiSettings.getAppCheckToken) {
        const appCheckToken = await url.apiSettings.getAppCheckToken();
        if (appCheckToken) {
            headers.append('X-Firebase-AppCheck', appCheckToken.token);
            if (appCheckToken.error) {
                logger.warn(`Unable to obtain a valid App Check token: ${appCheckToken.error.message}`);
            }
        }
    }
    if (url.apiSettings.getAuthToken) {
        const authToken = await url.apiSettings.getAuthToken();
        if (authToken) {
            headers.append('Authorization', `Firebase ${authToken.accessToken}`);
        }
    }
    return headers;
}
async function constructRequest(model, task, apiSettings, stream, body, requestOptions) {
    const url = new RequestUrl(model, task, apiSettings, stream, requestOptions);
    return {
        url: url.toString(),
        fetchOptions: {
            method: 'POST',
            headers: await getHeaders(url),
            body
        }
    };
}
async function makeRequest(model, task, apiSettings, stream, body, requestOptions) {
    const url = new RequestUrl(model, task, apiSettings, stream, requestOptions);
    let response;
    let fetchTimeoutId;
    try {
        const request = await constructRequest(model, task, apiSettings, stream, body, requestOptions);
        // Timeout is 180s by default
        const timeoutMillis = (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) != null && requestOptions.timeout >= 0
            ? requestOptions.timeout
            : DEFAULT_FETCH_TIMEOUT_MS;
        const abortController = new AbortController();
        fetchTimeoutId = setTimeout(() => abortController.abort(), timeoutMillis);
        request.fetchOptions.signal = abortController.signal;
        response = await fetch(request.url, request.fetchOptions);
        if (!response.ok) {
            let message = '';
            let errorDetails;
            try {
                const json = await response.json();
                message = json.error.message;
                if (json.error.details) {
                    message += ` ${JSON.stringify(json.error.details)}`;
                    errorDetails = json.error.details;
                }
            }
            catch (e) {
                // ignored
            }
            if (response.status === 403 &&
                errorDetails.some((detail) => detail.reason === 'SERVICE_DISABLED') &&
                errorDetails.some((detail) => {
                    var _a, _b;
                    return (_b = (_a = detail.links) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.description.includes('Google developers console API activation');
                })) {
                throw new AIError("api-not-enabled" /* AIErrorCode.API_NOT_ENABLED */, `The Firebase AI SDK requires the Firebase AI ` +
                    `API ('firebasevertexai.googleapis.com') to be enabled in your ` +
                    `Firebase project. Enable this API by visiting the Firebase Console ` +
                    `at https://console.firebase.google.com/project/${url.apiSettings.project}/genai/ ` +
                    `and clicking "Get started". If you enabled this API recently, ` +
                    `wait a few minutes for the action to propagate to our systems and ` +
                    `then retry.`, {
                    status: response.status,
                    statusText: response.statusText,
                    errorDetails
                });
            }
            throw new AIError("fetch-error" /* AIErrorCode.FETCH_ERROR */, `Error fetching from ${url}: [${response.status} ${response.statusText}] ${message}`, {
                status: response.status,
                statusText: response.statusText,
                errorDetails
            });
        }
    }
    catch (e) {
        let err = e;
        if (e.code !== "fetch-error" /* AIErrorCode.FETCH_ERROR */ &&
            e.code !== "api-not-enabled" /* AIErrorCode.API_NOT_ENABLED */ &&
            e instanceof Error) {
            err = new AIError("error" /* AIErrorCode.ERROR */, `Error fetching from ${url.toString()}: ${e.message}`);
            err.stack = e.stack;
        }
        throw err;
    }
    finally {
        if (fetchTimeoutId) {
            clearTimeout(fetchTimeoutId);
        }
    }
    return response;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Creates an EnhancedGenerateContentResponse object that has helper functions and
 * other modifications that improve usability.
 */
function createEnhancedContentResponse(response) {
    /**
     * The Vertex AI backend omits default values.
     * This causes the `index` property to be omitted from the first candidate in the
     * response, since it has index 0, and 0 is a default value.
     * See: https://github.com/firebase/firebase-js-sdk/issues/8566
     */
    if (response.candidates && !response.candidates[0].hasOwnProperty('index')) {
        response.candidates[0].index = 0;
    }
    const responseWithHelpers = addHelpers(response);
    return responseWithHelpers;
}
/**
 * Adds convenience helper methods to a response object, including stream
 * chunks (as long as each chunk is a complete GenerateContentResponse JSON).
 */
function addHelpers(response) {
    response.text = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                logger.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning text from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, `Response error: ${formatBlockErrorMessage(response)}. Response body stored in error.response`, {
                    response
                });
            }
            return getText(response);
        }
        else if (response.promptFeedback) {
            throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, `Text not available. ${formatBlockErrorMessage(response)}`, {
                response
            });
        }
        return '';
    };
    response.inlineDataParts = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                logger.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning data from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, `Response error: ${formatBlockErrorMessage(response)}. Response body stored in error.response`, {
                    response
                });
            }
            return getInlineDataParts(response);
        }
        else if (response.promptFeedback) {
            throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, `Data not available. ${formatBlockErrorMessage(response)}`, {
                response
            });
        }
        return undefined;
    };
    response.functionCalls = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                logger.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning function calls from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, `Response error: ${formatBlockErrorMessage(response)}. Response body stored in error.response`, {
                    response
                });
            }
            return getFunctionCalls(response);
        }
        else if (response.promptFeedback) {
            throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, `Function call not available. ${formatBlockErrorMessage(response)}`, {
                response
            });
        }
        return undefined;
    };
    return response;
}
/**
 * Returns all text found in all parts of first candidate.
 */
function getText(response) {
    var _a, _b, _c, _d;
    const textStrings = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.text) {
                textStrings.push(part.text);
            }
        }
    }
    if (textStrings.length > 0) {
        return textStrings.join('');
    }
    else {
        return '';
    }
}
/**
 * Returns {@link FunctionCall}s associated with first candidate.
 */
function getFunctionCalls(response) {
    var _a, _b, _c, _d;
    const functionCalls = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.functionCall) {
                functionCalls.push(part.functionCall);
            }
        }
    }
    if (functionCalls.length > 0) {
        return functionCalls;
    }
    else {
        return undefined;
    }
}
/**
 * Returns {@link InlineDataPart}s in the first candidate if present.
 *
 * @internal
 */
function getInlineDataParts(response) {
    var _a, _b, _c, _d;
    const data = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.inlineData) {
                data.push(part);
            }
        }
    }
    if (data.length > 0) {
        return data;
    }
    else {
        return undefined;
    }
}
const badFinishReasons = [exports.FinishReason.RECITATION, exports.FinishReason.SAFETY];
function hadBadFinishReason(candidate) {
    return (!!candidate.finishReason &&
        badFinishReasons.includes(candidate.finishReason));
}
function formatBlockErrorMessage(response) {
    var _a, _b, _c;
    let message = '';
    if ((!response.candidates || response.candidates.length === 0) &&
        response.promptFeedback) {
        message += 'Response was blocked';
        if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
            message += ` due to ${response.promptFeedback.blockReason}`;
        }
        if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
            message += `: ${response.promptFeedback.blockReasonMessage}`;
        }
    }
    else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
        const firstCandidate = response.candidates[0];
        if (hadBadFinishReason(firstCandidate)) {
            message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
            if (firstCandidate.finishMessage) {
                message += `: ${firstCandidate.finishMessage}`;
            }
        }
    }
    return message;
}
/**
 * Convert a generic successful fetch response body to an Imagen response object
 * that can be returned to the user. This converts the REST APIs response format to our
 * APIs representation of a response.
 *
 * @internal
 */
async function handlePredictResponse(response) {
    var _a;
    const responseJson = await response.json();
    const images = [];
    let filteredReason = undefined;
    // The backend should always send a non-empty array of predictions if the response was successful.
    if (!responseJson.predictions || ((_a = responseJson.predictions) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, 'No predictions or filtered reason received from Vertex AI. Please report this issue with the full error details at https://github.com/firebase/firebase-js-sdk/issues.');
    }
    for (const prediction of responseJson.predictions) {
        if (prediction.raiFilteredReason) {
            filteredReason = prediction.raiFilteredReason;
        }
        else if (prediction.mimeType && prediction.bytesBase64Encoded) {
            images.push({
                mimeType: prediction.mimeType,
                bytesBase64Encoded: prediction.bytesBase64Encoded
            });
        }
        else if (prediction.mimeType && prediction.gcsUri) {
            images.push({
                mimeType: prediction.mimeType,
                gcsURI: prediction.gcsUri
            });
        }
        else {
            throw new AIError("response-error" /* AIErrorCode.RESPONSE_ERROR */, `Predictions array in response has missing properties. Response: ${JSON.stringify(responseJson)}`);
        }
    }
    return { images, filteredReason };
}

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * This SDK supports both the Vertex AI Gemini API and the Gemini Developer API (using Google AI).
 * The public API prioritizes the format used by the Vertex AI Gemini API.
 * We avoid having two sets of types by translating requests and responses between the two API formats.
 * This translation allows developers to switch between the Vertex AI Gemini API and the Gemini Developer API
 * with minimal code changes.
 *
 * In here are functions that map requests and responses between the two API formats.
 * Requests in the Vertex AI format are mapped to the Google AI format before being sent.
 * Responses from the Google AI backend are mapped back to the Vertex AI format before being returned to the user.
 */
/**
 * Maps a Vertex AI {@link GenerateContentRequest} to a format that can be sent to Google AI.
 *
 * @param generateContentRequest The {@link GenerateContentRequest} to map.
 * @returns A {@link GenerateContentResponse} that conforms to the Google AI format.
 *
 * @throws If the request contains properties that are unsupported by Google AI.
 *
 * @internal
 */
function mapGenerateContentRequest(generateContentRequest) {
    var _a, _b;
    (_a = generateContentRequest.safetySettings) === null || _a === void 0 ? void 0 : _a.forEach(safetySetting => {
        if (safetySetting.method) {
            throw new AIError("unsupported" /* AIErrorCode.UNSUPPORTED */, 'SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.');
        }
    });
    if ((_b = generateContentRequest.generationConfig) === null || _b === void 0 ? void 0 : _b.topK) {
        const roundedTopK = Math.round(generateContentRequest.generationConfig.topK);
        if (roundedTopK !== generateContentRequest.generationConfig.topK) {
            logger.warn('topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API.');
            generateContentRequest.generationConfig.topK = roundedTopK;
        }
    }
    return generateContentRequest;
}
/**
 * Maps a {@link GenerateContentResponse} from Google AI to the format of the
 * {@link GenerateContentResponse} that we get from VertexAI that is exposed in the public API.
 *
 * @param googleAIResponse The {@link GenerateContentResponse} from Google AI.
 * @returns A {@link GenerateContentResponse} that conforms to the public API's format.
 *
 * @internal
 */
function mapGenerateContentResponse(googleAIResponse) {
    const generateContentResponse = {
        candidates: googleAIResponse.candidates
            ? mapGenerateContentCandidates(googleAIResponse.candidates)
            : undefined,
        prompt: googleAIResponse.promptFeedback
            ? mapPromptFeedback(googleAIResponse.promptFeedback)
            : undefined,
        usageMetadata: googleAIResponse.usageMetadata
    };
    return generateContentResponse;
}
/**
 * Maps a Vertex AI {@link CountTokensRequest} to a format that can be sent to Google AI.
 *
 * @param countTokensRequest The {@link CountTokensRequest} to map.
 * @param model The model to count tokens with.
 * @returns A {@link CountTokensRequest} that conforms to the Google AI format.
 *
 * @internal
 */
function mapCountTokensRequest(countTokensRequest, model) {
    const mappedCountTokensRequest = {
        generateContentRequest: Object.assign({ model }, countTokensRequest)
    };
    return mappedCountTokensRequest;
}
/**
 * Maps a Google AI {@link GoogleAIGenerateContentCandidate} to a format that conforms
 * to the Vertex AI API format.
 *
 * @param candidates The {@link GoogleAIGenerateContentCandidate} to map.
 * @returns A {@link GenerateContentCandidate} that conforms to the Vertex AI format.
 *
 * @throws If any {@link Part} in the candidates has a `videoMetadata` property.
 *
 * @internal
 */
function mapGenerateContentCandidates(candidates) {
    const mappedCandidates = [];
    let mappedSafetyRatings;
    if (mappedCandidates) {
        candidates.forEach(candidate => {
            var _a;
            // Map citationSources to citations.
            let citationMetadata;
            if (candidate.citationMetadata) {
                citationMetadata = {
                    citations: candidate.citationMetadata.citationSources
                };
            }
            // Assign missing candidate SafetyRatings properties to their defaults if undefined.
            if (candidate.safetyRatings) {
                mappedSafetyRatings = candidate.safetyRatings.map(safetyRating => {
                    var _a, _b, _c;
                    return Object.assign(Object.assign({}, safetyRating), { severity: (_a = safetyRating.severity) !== null && _a !== void 0 ? _a : exports.HarmSeverity.HARM_SEVERITY_UNSUPPORTED, probabilityScore: (_b = safetyRating.probabilityScore) !== null && _b !== void 0 ? _b : 0, severityScore: (_c = safetyRating.severityScore) !== null && _c !== void 0 ? _c : 0 });
                });
            }
            // videoMetadata is not supported.
            // Throw early since developers may send a long video as input and only expect to pay
            // for inference on a small portion of the video.
            if ((_a = candidate.content) === null || _a === void 0 ? void 0 : _a.parts.some(part => part === null || part === void 0 ? void 0 : part.videoMetadata)) {
                throw new AIError("unsupported" /* AIErrorCode.UNSUPPORTED */, 'Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.');
            }
            const mappedCandidate = {
                index: candidate.index,
                content: candidate.content,
                finishReason: candidate.finishReason,
                finishMessage: candidate.finishMessage,
                safetyRatings: mappedSafetyRatings,
                citationMetadata,
                groundingMetadata: candidate.groundingMetadata
            };
            mappedCandidates.push(mappedCandidate);
        });
    }
    return mappedCandidates;
}
function mapPromptFeedback(promptFeedback) {
    // Assign missing SafetyRating properties to their defaults if undefined.
    const mappedSafetyRatings = [];
    promptFeedback.safetyRatings.forEach(safetyRating => {
        var _a, _b, _c;
        mappedSafetyRatings.push({
            category: safetyRating.category,
            probability: safetyRating.probability,
            severity: (_a = safetyRating.severity) !== null && _a !== void 0 ? _a : exports.HarmSeverity.HARM_SEVERITY_UNSUPPORTED,
            probabilityScore: (_b = safetyRating.probabilityScore) !== null && _b !== void 0 ? _b : 0,
            severityScore: (_c = safetyRating.severityScore) !== null && _c !== void 0 ? _c : 0,
            blocked: safetyRating.blocked
        });
    });
    const mappedPromptFeedback = {
        blockReason: promptFeedback.blockReason,
        safetyRatings: mappedSafetyRatings,
        blockReasonMessage: promptFeedback.blockReasonMessage
    };
    return mappedPromptFeedback;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
/**
 * Process a response.body stream from the backend and return an
 * iterator that provides one complete GenerateContentResponse at a time
 * and a promise that resolves with a single aggregated
 * GenerateContentResponse.
 *
 * @param response - Response from a fetch call
 */
function processStream(response, apiSettings) {
    const inputStream = response.body.pipeThrough(new TextDecoderStream('utf8', { fatal: true }));
    const responseStream = getResponseStream(inputStream);
    const [stream1, stream2] = responseStream.tee();
    return {
        stream: generateResponseSequence(stream1, apiSettings),
        response: getResponsePromise(stream2, apiSettings)
    };
}
async function getResponsePromise(stream, apiSettings) {
    const allResponses = [];
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            let generateContentResponse = aggregateResponses(allResponses);
            if (apiSettings.backend.backendType === BackendType.GOOGLE_AI) {
                generateContentResponse = mapGenerateContentResponse(generateContentResponse);
            }
            return createEnhancedContentResponse(generateContentResponse);
        }
        allResponses.push(value);
    }
}
function generateResponseSequence(stream, apiSettings) {
    return tslib.__asyncGenerator(this, arguments, function* generateResponseSequence_1() {
        const reader = stream.getReader();
        while (true) {
            const { value, done } = yield tslib.__await(reader.read());
            if (done) {
                break;
            }
            let enhancedResponse;
            if (apiSettings.backend.backendType === BackendType.GOOGLE_AI) {
                enhancedResponse = createEnhancedContentResponse(mapGenerateContentResponse(value));
            }
            else {
                enhancedResponse = createEnhancedContentResponse(value);
            }
            yield yield tslib.__await(enhancedResponse);
        }
    });
}
/**
 * Reads a raw stream from the fetch response and join incomplete
 * chunks, returning a new stream that provides a single complete
 * GenerateContentResponse in each iteration.
 */
function getResponseStream(inputStream) {
    const reader = inputStream.getReader();
    const stream = new ReadableStream({
        start(controller) {
            let currentText = '';
            return pump();
            function pump() {
                return reader.read().then(({ value, done }) => {
                    if (done) {
                        if (currentText.trim()) {
                            controller.error(new AIError("parse-failed" /* AIErrorCode.PARSE_FAILED */, 'Failed to parse stream'));
                            return;
                        }
                        controller.close();
                        return;
                    }
                    currentText += value;
                    let match = currentText.match(responseLineRE);
                    let parsedResponse;
                    while (match) {
                        try {
                            parsedResponse = JSON.parse(match[1]);
                        }
                        catch (e) {
                            controller.error(new AIError("parse-failed" /* AIErrorCode.PARSE_FAILED */, `Error parsing JSON response: "${match[1]}`));
                            return;
                        }
                        controller.enqueue(parsedResponse);
                        currentText = currentText.substring(match[0].length);
                        match = currentText.match(responseLineRE);
                    }
                    return pump();
                });
            }
        }
    });
    return stream;
}
/**
 * Aggregates an array of `GenerateContentResponse`s into a single
 * GenerateContentResponse.
 */
function aggregateResponses(responses) {
    const lastResponse = responses[responses.length - 1];
    const aggregatedResponse = {
        promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
    };
    for (const response of responses) {
        if (response.candidates) {
            for (const candidate of response.candidates) {
                // Index will be undefined if it's the first index (0), so we should use 0 if it's undefined.
                // See: https://github.com/firebase/firebase-js-sdk/issues/8566
                const i = candidate.index || 0;
                if (!aggregatedResponse.candidates) {
                    aggregatedResponse.candidates = [];
                }
                if (!aggregatedResponse.candidates[i]) {
                    aggregatedResponse.candidates[i] = {
                        index: candidate.index
                    };
                }
                // Keep overwriting, the last one will be final
                aggregatedResponse.candidates[i].citationMetadata =
                    candidate.citationMetadata;
                aggregatedResponse.candidates[i].finishReason = candidate.finishReason;
                aggregatedResponse.candidates[i].finishMessage =
                    candidate.finishMessage;
                aggregatedResponse.candidates[i].safetyRatings =
                    candidate.safetyRatings;
                /**
                 * Candidates should always have content and parts, but this handles
                 * possible malformed responses.
                 */
                if (candidate.content && candidate.content.parts) {
                    if (!aggregatedResponse.candidates[i].content) {
                        aggregatedResponse.candidates[i].content = {
                            role: candidate.content.role || 'user',
                            parts: []
                        };
                    }
                    const newPart = {};
                    for (const part of candidate.content.parts) {
                        if (part.text !== undefined) {
                            // The backend can send empty text parts. If these are sent back
                            // (e.g. in chat history), the backend will respond with an error.
                            // To prevent this, ignore empty text parts.
                            if (part.text === '') {
                                continue;
                            }
                            newPart.text = part.text;
                        }
                        if (part.functionCall) {
                            newPart.functionCall = part.functionCall;
                        }
                        if (Object.keys(newPart).length === 0) {
                            throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, 'Part should have at least one property, but there are none. This is likely caused ' +
                                'by a malformed response from the backend.');
                        }
                        aggregatedResponse.candidates[i].content.parts.push(newPart);
                    }
                }
            }
        }
    }
    return aggregatedResponse;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function generateContentStream(apiSettings, model, params, requestOptions) {
    if (apiSettings.backend.backendType === BackendType.GOOGLE_AI) {
        params = mapGenerateContentRequest(params);
    }
    const response = await makeRequest(model, Task.STREAM_GENERATE_CONTENT, apiSettings, 
    /* stream */ true, JSON.stringify(params), requestOptions);
    return processStream(response, apiSettings); // TODO: Map streaming responses
}
async function generateContent(apiSettings, model, params, requestOptions) {
    if (apiSettings.backend.backendType === BackendType.GOOGLE_AI) {
        params = mapGenerateContentRequest(params);
    }
    const response = await makeRequest(model, Task.GENERATE_CONTENT, apiSettings, 
    /* stream */ false, JSON.stringify(params), requestOptions);
    const generateContentResponse = await processGenerateContentResponse(response, apiSettings);
    const enhancedResponse = createEnhancedContentResponse(generateContentResponse);
    return {
        response: enhancedResponse
    };
}
async function processGenerateContentResponse(response, apiSettings) {
    const responseJson = await response.json();
    if (apiSettings.backend.backendType === BackendType.GOOGLE_AI) {
        return mapGenerateContentResponse(responseJson);
    }
    else {
        return responseJson;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function formatSystemInstruction(input) {
    // null or undefined
    if (input == null) {
        return undefined;
    }
    else if (typeof input === 'string') {
        return { role: 'system', parts: [{ text: input }] };
    }
    else if (input.text) {
        return { role: 'system', parts: [input] };
    }
    else if (input.parts) {
        if (!input.role) {
            return { role: 'system', parts: input.parts };
        }
        else {
            return input;
        }
    }
}
function formatNewContent(request) {
    let newParts = [];
    if (typeof request === 'string') {
        newParts = [{ text: request }];
    }
    else {
        for (const partOrString of request) {
            if (typeof partOrString === 'string') {
                newParts.push({ text: partOrString });
            }
            else {
                newParts.push(partOrString);
            }
        }
    }
    return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
/**
 * When multiple Part types (i.e. FunctionResponsePart and TextPart) are
 * passed in a single Part array, we may need to assign different roles to each
 * part. Currently only FunctionResponsePart requires a role other than 'user'.
 * @private
 * @param parts Array of parts to pass to the model
 * @returns Array of content items
 */
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
    const userContent = { role: 'user', parts: [] };
    const functionContent = { role: 'function', parts: [] };
    let hasUserContent = false;
    let hasFunctionContent = false;
    for (const part of parts) {
        if ('functionResponse' in part) {
            functionContent.parts.push(part);
            hasFunctionContent = true;
        }
        else {
            userContent.parts.push(part);
            hasUserContent = true;
        }
    }
    if (hasUserContent && hasFunctionContent) {
        throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, 'Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.');
    }
    if (!hasUserContent && !hasFunctionContent) {
        throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, 'No Content is provided for sending chat message.');
    }
    if (hasUserContent) {
        return userContent;
    }
    return functionContent;
}
function formatGenerateContentInput(params) {
    let formattedRequest;
    if (params.contents) {
        formattedRequest = params;
    }
    else {
        // Array or string
        const content = formatNewContent(params);
        formattedRequest = { contents: [content] };
    }
    if (params.systemInstruction) {
        formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
    }
    return formattedRequest;
}
/**
 * Convert the user-defined parameters in {@link ImagenGenerationParams} to the format
 * that is expected from the REST API.
 *
 * @internal
 */
function createPredictRequestBody(prompt, { gcsURI, imageFormat, addWatermark, numberOfImages = 1, negativePrompt, aspectRatio, safetyFilterLevel, personFilterLevel }) {
    // Properties that are undefined will be omitted from the JSON string that is sent in the request.
    const body = {
        instances: [
            {
                prompt
            }
        ],
        parameters: {
            storageUri: gcsURI,
            negativePrompt,
            sampleCount: numberOfImages,
            aspectRatio,
            outputOptions: imageFormat,
            addWatermark,
            safetyFilterLevel,
            personGeneration: personFilterLevel,
            includeRaiReason: true
        }
    };
    return body;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// https://ai.google.dev/api/rest/v1beta/Content#part
const VALID_PART_FIELDS = [
    'text',
    'inlineData',
    'functionCall',
    'functionResponse'
];
const VALID_PARTS_PER_ROLE = {
    user: ['text', 'inlineData'],
    function: ['functionResponse'],
    model: ['text', 'functionCall'],
    // System instructions shouldn't be in history anyway.
    system: ['text']
};
const VALID_PREVIOUS_CONTENT_ROLES = {
    user: ['model'],
    function: ['model'],
    model: ['user', 'function'],
    // System instructions shouldn't be in history.
    system: []
};
function validateChatHistory(history) {
    let prevContent = null;
    for (const currContent of history) {
        const { role, parts } = currContent;
        if (!prevContent && role !== 'user') {
            throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, `First Content should be with role 'user', got ${role}`);
        }
        if (!POSSIBLE_ROLES.includes(role)) {
            throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, `Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
        }
        if (!Array.isArray(parts)) {
            throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, `Content should have 'parts' but property with an array of Parts`);
        }
        if (parts.length === 0) {
            throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, `Each Content should have at least one part`);
        }
        const countFields = {
            text: 0,
            inlineData: 0,
            functionCall: 0,
            functionResponse: 0
        };
        for (const part of parts) {
            for (const key of VALID_PART_FIELDS) {
                if (key in part) {
                    countFields[key] += 1;
                }
            }
        }
        const validParts = VALID_PARTS_PER_ROLE[role];
        for (const key of VALID_PART_FIELDS) {
            if (!validParts.includes(key) && countFields[key] > 0) {
                throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, `Content with role '${role}' can't contain '${key}' part`);
            }
        }
        if (prevContent) {
            const validPreviousContentRoles = VALID_PREVIOUS_CONTENT_ROLES[role];
            if (!validPreviousContentRoles.includes(prevContent.role)) {
                throw new AIError("invalid-content" /* AIErrorCode.INVALID_CONTENT */, `Content with role '${role}' can't follow '${prevContent.role}'. Valid previous roles: ${JSON.stringify(VALID_PREVIOUS_CONTENT_ROLES)}`);
            }
        }
        prevContent = currContent;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do not log a message for this error.
 */
const SILENT_ERROR = 'SILENT_ERROR';
/**
 * ChatSession class that enables sending chat messages and stores
 * history of sent and received messages so far.
 *
 * @public
 */
class ChatSession {
    constructor(apiSettings, model, params, requestOptions) {
        this.model = model;
        this.params = params;
        this.requestOptions = requestOptions;
        this._history = [];
        this._sendPromise = Promise.resolve();
        this._apiSettings = apiSettings;
        if (params === null || params === void 0 ? void 0 : params.history) {
            validateChatHistory(params.history);
            this._history = params.history;
        }
    }
    /**
     * Gets the chat history so far. Blocked prompts are not added to history.
     * Neither blocked candidates nor the prompts that generated them are added
     * to history.
     */
    async getHistory() {
        await this._sendPromise;
        return this._history;
    }
    /**
     * Sends a chat message and receives a non-streaming
     * {@link GenerateContentResult}
     */
    async sendMessage(request) {
        var _a, _b, _c, _d, _e;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            contents: [...this._history, newContent]
        };
        let finalResult = {};
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => generateContent(this._apiSettings, this.model, generateContentRequest, this.requestOptions))
            .then(result => {
            var _a, _b;
            if (result.response.candidates &&
                result.response.candidates.length > 0) {
                this._history.push(newContent);
                const responseContent = {
                    parts: ((_a = result.response.candidates) === null || _a === void 0 ? void 0 : _a[0].content.parts) || [],
                    // Response seems to come back without a role set.
                    role: ((_b = result.response.candidates) === null || _b === void 0 ? void 0 : _b[0].content.role) || 'model'
                };
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(result.response);
                if (blockErrorMessage) {
                    logger.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
            finalResult = result;
        });
        await this._sendPromise;
        return finalResult;
    }
    /**
     * Sends a chat message and receives the response as a
     * {@link GenerateContentStreamResult} containing an iterable stream
     * and a response promise.
     */
    async sendMessageStream(request) {
        var _a, _b, _c, _d, _e;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            contents: [...this._history, newContent]
        };
        const streamPromise = generateContentStream(this._apiSettings, this.model, generateContentRequest, this.requestOptions);
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => streamPromise)
            // This must be handled to avoid unhandled rejection, but jump
            // to the final catch block with a label to not log this error.
            .catch(_ignored => {
            throw new Error(SILENT_ERROR);
        })
            .then(streamResult => streamResult.response)
            .then(response => {
            if (response.candidates && response.candidates.length > 0) {
                this._history.push(newContent);
                const responseContent = Object.assign({}, response.candidates[0].content);
                // Response seems to come back without a role set.
                if (!responseContent.role) {
                    responseContent.role = 'model';
                }
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(response);
                if (blockErrorMessage) {
                    logger.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
        })
            .catch(e => {
            // Errors in streamPromise are already catchable by the user as
            // streamPromise is returned.
            // Avoid duplicating the error message in logs.
            if (e.message !== SILENT_ERROR) {
                // Users do not have access to _sendPromise to catch errors
                // downstream from streamPromise, so they should not throw.
                logger.error(e);
            }
        });
        return streamPromise;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function countTokens(apiSettings, model, params, requestOptions) {
    let body = '';
    if (apiSettings.backend.backendType === BackendType.GOOGLE_AI) {
        const mappedParams = mapCountTokensRequest(params, model);
        body = JSON.stringify(mappedParams);
    }
    else {
        body = JSON.stringify(params);
    }
    const response = await makeRequest(model, Task.COUNT_TOKENS, apiSettings, false, body, requestOptions);
    return response.json();
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Class for generative model APIs.
 * @public
 */
class GenerativeModel extends AIModel {
    constructor(ai, modelParams, requestOptions) {
        super(ai, modelParams.model);
        this.generationConfig = modelParams.generationConfig || {};
        this.safetySettings = modelParams.safetySettings || [];
        this.tools = modelParams.tools;
        this.toolConfig = modelParams.toolConfig;
        this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
        this.requestOptions = requestOptions || {};
    }
    /**
     * Makes a single non-streaming call to the model
     * and returns an object containing a single {@link GenerateContentResponse}.
     */
    async generateContent(request) {
        const formattedParams = formatGenerateContentInput(request);
        return generateContent(this._apiSettings, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction }, formattedParams), this.requestOptions);
    }
    /**
     * Makes a single streaming call to the model
     * and returns an object containing an iterable stream that iterates
     * over all chunks in the streaming response as well as
     * a promise that returns the final aggregated response.
     */
    async generateContentStream(request) {
        const formattedParams = formatGenerateContentInput(request);
        return generateContentStream(this._apiSettings, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction }, formattedParams), this.requestOptions);
    }
    /**
     * Gets a new {@link ChatSession} instance which can be used for
     * multi-turn chats.
     */
    startChat(startChatParams) {
        return new ChatSession(this._apiSettings, this.model, Object.assign({ tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, generationConfig: this.generationConfig, safetySettings: this.safetySettings }, startChatParams), this.requestOptions);
    }
    /**
     * Counts the tokens in the provided request.
     */
    async countTokens(request) {
        const formattedParams = formatGenerateContentInput(request);
        return countTokens(this._apiSettings, this.model, formattedParams);
    }
}

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Class for Imagen model APIs.
 *
 * This class provides methods for generating images using the Imagen model.
 *
 * @example
 * ```javascript
 * const imagen = new ImagenModel(
 *   ai,
 *   {
 *     model: 'imagen-3.0-generate-002'
 *   }
 * );
 *
 * const response = await imagen.generateImages('A photo of a cat');
 * if (response.images.length > 0) {
 *   console.log(response.images[0].bytesBase64Encoded);
 * }
 * ```
 *
 * @beta
 */
class ImagenModel extends AIModel {
    /**
     * Constructs a new instance of the {@link ImagenModel} class.
     *
     * @param ai - an {@link AI} instance.
     * @param modelParams - Parameters to use when making requests to Imagen.
     * @param requestOptions - Additional options to use when making requests.
     *
     * @throws If the `apiKey` or `projectId` fields are missing in your
     * Firebase config.
     */
    constructor(ai, modelParams, requestOptions) {
        const { model, generationConfig, safetySettings } = modelParams;
        super(ai, model);
        this.requestOptions = requestOptions;
        this.generationConfig = generationConfig;
        this.safetySettings = safetySettings;
    }
    /**
     * Generates images using the Imagen model and returns them as
     * base64-encoded strings.
     *
     * @param prompt - A text prompt describing the image(s) to generate.
     * @returns A promise that resolves to an {@link ImagenGenerationResponse}
     * object containing the generated images.
     *
     * @throws If the request to generate images fails. This happens if the
     * prompt is blocked.
     *
     * @remarks
     * If the prompt was not blocked, but one or more of the generated images were filtered, the
     * returned object will have a `filteredReason` property.
     * If all images are filtered, the `images` array will be empty.
     *
     * @beta
     */
    async generateImages(prompt) {
        const body = createPredictRequestBody(prompt, Object.assign(Object.assign({}, this.generationConfig), this.safetySettings));
        const response = await makeRequest(this.model, Task.PREDICT, this._apiSettings, 
        /* stream */ false, JSON.stringify(body), this.requestOptions);
        return handlePredictResponse(response);
    }
    /**
     * Generates images to Cloud Storage for Firebase using the Imagen model.
     *
     * @internal This method is temporarily internal.
     *
     * @param prompt - A text prompt describing the image(s) to generate.
     * @param gcsURI - The URI of file stored in a Cloud Storage for Firebase bucket.
     * This should be a directory. For example, `gs://my-bucket/my-directory/`.
     * @returns A promise that resolves to an {@link ImagenGenerationResponse}
     * object containing the URLs of the generated images.
     *
     * @throws If the request fails to generate images fails. This happens if
     * the prompt is blocked.
     *
     * @remarks
     * If the prompt was not blocked, but one or more of the generated images were filtered, the
     * returned object will have a `filteredReason` property.
     * If all images are filtered, the `images` array will be empty.
     */
    async generateImagesGCS(prompt, gcsURI) {
        const body = createPredictRequestBody(prompt, Object.assign(Object.assign({ gcsURI }, this.generationConfig), this.safetySettings));
        const response = await makeRequest(this.model, Task.PREDICT, this._apiSettings, 
        /* stream */ false, JSON.stringify(body), this.requestOptions);
        return handlePredictResponse(response);
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Parent class encompassing all Schema types, with static methods that
 * allow building specific Schema types. This class can be converted with
 * `JSON.stringify()` into a JSON string accepted by Vertex AI REST endpoints.
 * (This string conversion is automatically done when calling SDK methods.)
 * @public
 */
class Schema {
    constructor(schemaParams) {
        // eslint-disable-next-line guard-for-in
        for (const paramKey in schemaParams) {
            this[paramKey] = schemaParams[paramKey];
        }
        // Ensure these are explicitly set to avoid TS errors.
        this.type = schemaParams.type;
        this.nullable = schemaParams.hasOwnProperty('nullable')
            ? !!schemaParams.nullable
            : false;
    }
    /**
     * Defines how this Schema should be serialized as JSON.
     * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior
     * @internal
     */
    toJSON() {
        const obj = {
            type: this.type
        };
        for (const prop in this) {
            if (this.hasOwnProperty(prop) && this[prop] !== undefined) {
                if (prop !== 'required' || this.type === exports.SchemaType.OBJECT) {
                    obj[prop] = this[prop];
                }
            }
        }
        return obj;
    }
    static array(arrayParams) {
        return new ArraySchema(arrayParams, arrayParams.items);
    }
    static object(objectParams) {
        return new ObjectSchema(objectParams, objectParams.properties, objectParams.optionalProperties);
    }
    // eslint-disable-next-line id-blacklist
    static string(stringParams) {
        return new StringSchema(stringParams);
    }
    static enumString(stringParams) {
        return new StringSchema(stringParams, stringParams.enum);
    }
    static integer(integerParams) {
        return new IntegerSchema(integerParams);
    }
    // eslint-disable-next-line id-blacklist
    static number(numberParams) {
        return new NumberSchema(numberParams);
    }
    // eslint-disable-next-line id-blacklist
    static boolean(booleanParams) {
        return new BooleanSchema(booleanParams);
    }
}
/**
 * Schema class for "integer" types.
 * @public
 */
class IntegerSchema extends Schema {
    constructor(schemaParams) {
        super(Object.assign({ type: exports.SchemaType.INTEGER }, schemaParams));
    }
}
/**
 * Schema class for "number" types.
 * @public
 */
class NumberSchema extends Schema {
    constructor(schemaParams) {
        super(Object.assign({ type: exports.SchemaType.NUMBER }, schemaParams));
    }
}
/**
 * Schema class for "boolean" types.
 * @public
 */
class BooleanSchema extends Schema {
    constructor(schemaParams) {
        super(Object.assign({ type: exports.SchemaType.BOOLEAN }, schemaParams));
    }
}
/**
 * Schema class for "string" types. Can be used with or without
 * enum values.
 * @public
 */
class StringSchema extends Schema {
    constructor(schemaParams, enumValues) {
        super(Object.assign({ type: exports.SchemaType.STRING }, schemaParams));
        this.enum = enumValues;
    }
    /**
     * @internal
     */
    toJSON() {
        const obj = super.toJSON();
        if (this.enum) {
            obj['enum'] = this.enum;
        }
        return obj;
    }
}
/**
 * Schema class for "array" types.
 * The `items` param should refer to the type of item that can be a member
 * of the array.
 * @public
 */
class ArraySchema extends Schema {
    constructor(schemaParams, items) {
        super(Object.assign({ type: exports.SchemaType.ARRAY }, schemaParams));
        this.items = items;
    }
    /**
     * @internal
     */
    toJSON() {
        const obj = super.toJSON();
        obj.items = this.items.toJSON();
        return obj;
    }
}
/**
 * Schema class for "object" types.
 * The `properties` param must be a map of `Schema` objects.
 * @public
 */
class ObjectSchema extends Schema {
    constructor(schemaParams, properties, optionalProperties = []) {
        super(Object.assign({ type: exports.SchemaType.OBJECT }, schemaParams));
        this.properties = properties;
        this.optionalProperties = optionalProperties;
    }
    /**
     * @internal
     */
    toJSON() {
        const obj = super.toJSON();
        obj.properties = Object.assign({}, this.properties);
        const required = [];
        if (this.optionalProperties) {
            for (const propertyKey of this.optionalProperties) {
                if (!this.properties.hasOwnProperty(propertyKey)) {
                    throw new AIError("invalid-schema" /* AIErrorCode.INVALID_SCHEMA */, `Property "${propertyKey}" specified in "optionalProperties" does not exist.`);
                }
            }
        }
        for (const propertyKey in this.properties) {
            if (this.properties.hasOwnProperty(propertyKey)) {
                obj.properties[propertyKey] = this.properties[propertyKey].toJSON();
                if (!this.optionalProperties.includes(propertyKey)) {
                    required.push(propertyKey);
                }
            }
        }
        if (required.length > 0) {
            obj.required = required;
        }
        delete obj.optionalProperties;
        return obj;
    }
}

/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Defines the image format for images generated by Imagen.
 *
 * Use this class to specify the desired format (JPEG or PNG) and compression quality
 * for images generated by Imagen. This is typically included as part of
 * {@link ImagenModelParams}.
 *
 * @example
 * ```javascript
 * const imagenModelParams = {
 *   // ... other ImagenModelParams
 *   imageFormat: ImagenImageFormat.jpeg(75) // JPEG with a compression level of 75.
 * }
 * ```
 *
 * @beta
 */
class ImagenImageFormat {
    constructor() {
        this.mimeType = 'image/png';
    }
    /**
     * Creates an {@link ImagenImageFormat} for a JPEG image.
     *
     * @param compressionQuality - The level of compression (a number between 0 and 100).
     * @returns An {@link ImagenImageFormat} object for a JPEG image.
     *
     * @beta
     */
    static jpeg(compressionQuality) {
        if (compressionQuality &&
            (compressionQuality < 0 || compressionQuality > 100)) {
            logger.warn(`Invalid JPEG compression quality of ${compressionQuality} specified; the supported range is [0, 100].`);
        }
        return { mimeType: 'image/jpeg', compressionQuality };
    }
    /**
     * Creates an {@link ImagenImageFormat} for a PNG image.
     *
     * @returns An {@link ImagenImageFormat} object for a PNG image.
     *
     * @beta
     */
    static png() {
        return { mimeType: 'image/png' };
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @deprecated Use the new {@link AIModel} instead. The Vertex AI in Firebase SDK has been
 * replaced with the Firebase AI SDK to accommodate the evolving set of supported features and
 * services. For migration details, see the {@link https://firebase.google.com/docs/vertex-ai/migrate-to-latest-sdk | migration guide}.
 *
 * Base class for Firebase AI model APIs.
 *
 * @public
 */
const VertexAIModel = AIModel;
/**
 * @deprecated Use the new {@link AIError} instead. The Vertex AI in Firebase SDK has been
 * replaced with the Firebase AI SDK to accommodate the evolving set of supported features and
 * services. For migration details, see the {@link https://firebase.google.com/docs/vertex-ai/migrate-to-latest-sdk | migration guide}.
 *
 * Error class for the Firebase AI SDK.
 *
 * @public
 */
const VertexAIError = AIError;
/**
 * @deprecated Use the new {@link getAI | getAI()} instead. The Vertex AI in Firebase SDK has been
 * replaced with the Firebase AI SDK to accommodate the evolving set of supported features and
 * services. For migration details, see the {@link https://firebase.google.com/docs/vertex-ai/migrate-to-latest-sdk | migration guide}.
 *
 * Returns a {@link VertexAI} instance for the given app, configured to use the
 * Vertex AI Gemini API. This instance will be
 * configured to use the Vertex AI Gemini API.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} to use.
 * @param options - Options to configure the Vertex AI instance, including the location.
 *
 * @public
 */
function getVertexAI(app$1 = app.getApp(), options) {
    app$1 = util.getModularInstance(app$1);
    // Dependencies
    const AIProvider = app._getProvider(app$1, AI_TYPE);
    const backend = new VertexAIBackend(options === null || options === void 0 ? void 0 : options.location);
    const identifier = encodeInstanceIdentifier(backend);
    return AIProvider.getImmediate({
        identifier
    });
}
/**
 * Returns the default {@link AI} instance that is associated with the provided
 * {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new instance with the
 * default settings.
 *
 * @example
 * ```javascript
 * const ai = getAI(app);
 * ```
 *
 * @example
 * ```javascript
 * // Get an AI instance configured to use the Gemini Developer API (via Google AI).
 * const ai = getAI(app, { backend: new GoogleAIBackend() });
 * ```
 *
 * @example
 * ```javascript
 * // Get an AI instance configured to use the Vertex AI Gemini API.
 * const ai = getAI(app, { backend: new VertexAIBackend() });
 * ```
 *
 * @param app - The {@link @firebase/app#FirebaseApp} to use.
 * @param options - {@link AIOptions} that configure the AI instance.
 * @returns The default {@link AI} instance for the given {@link @firebase/app#FirebaseApp}.
 *
 * @public
 */
function getAI(app$1 = app.getApp(), options = { backend: new GoogleAIBackend() }) {
    app$1 = util.getModularInstance(app$1);
    // Dependencies
    const AIProvider = app._getProvider(app$1, AI_TYPE);
    const identifier = encodeInstanceIdentifier(options.backend);
    return AIProvider.getImmediate({
        identifier
    });
}
/**
 * Returns a {@link GenerativeModel} class with methods for inference
 * and other functionality.
 *
 * @public
 */
function getGenerativeModel(ai, modelParams, requestOptions) {
    if (!modelParams.model) {
        throw new AIError("no-model" /* AIErrorCode.NO_MODEL */, `Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })`);
    }
    return new GenerativeModel(ai, modelParams, requestOptions);
}
/**
 * Returns an {@link ImagenModel} class with methods for using Imagen.
 *
 * Only Imagen 3 models (named `imagen-3.0-*`) are supported.
 *
 * @param ai - An {@link AI} instance.
 * @param modelParams - Parameters to use when making Imagen requests.
 * @param requestOptions - Additional options to use when making requests.
 *
 * @throws If the `apiKey` or `projectId` fields are missing in your
 * Firebase config.
 *
 * @beta
 */
function getImagenModel(ai, modelParams, requestOptions) {
    if (!modelParams.model) {
        throw new AIError("no-model" /* AIErrorCode.NO_MODEL */, `Must provide a model name. Example: getImagenModel({ model: 'my-model-name' })`);
    }
    return new ImagenModel(ai, modelParams, requestOptions);
}

/**
 * The Firebase AI Web SDK.
 *
 * @packageDocumentation
 */
function registerAI() {
    app._registerComponent(new component.Component(AI_TYPE, (container, { instanceIdentifier }) => {
        if (!instanceIdentifier) {
            throw new AIError("error" /* AIErrorCode.ERROR */, 'AIService instance identifier is undefined.');
        }
        const backend = decodeInstanceIdentifier(instanceIdentifier);
        // getImmediate for FirebaseApp will always succeed
        const app = container.getProvider('app').getImmediate();
        const auth = container.getProvider('auth-internal');
        const appCheckProvider = container.getProvider('app-check-internal');
        return new AIService(app, backend, auth, appCheckProvider);
    }, "PUBLIC" /* ComponentType.PUBLIC */).setMultipleInstances(true));
    app.registerVersion(name, version, 'node');
    // BUILD_TARGET will be replaced by values like esm2017, cjs2017, etc during the compilation
    app.registerVersion(name, version, 'cjs2017');
}
registerAI();

exports.AIError = AIError;
exports.AIModel = AIModel;
exports.ArraySchema = ArraySchema;
exports.Backend = Backend;
exports.BackendType = BackendType;
exports.BooleanSchema = BooleanSchema;
exports.ChatSession = ChatSession;
exports.GenerativeModel = GenerativeModel;
exports.GoogleAIBackend = GoogleAIBackend;
exports.ImagenImageFormat = ImagenImageFormat;
exports.ImagenModel = ImagenModel;
exports.IntegerSchema = IntegerSchema;
exports.NumberSchema = NumberSchema;
exports.ObjectSchema = ObjectSchema;
exports.POSSIBLE_ROLES = POSSIBLE_ROLES;
exports.ResponseModality = ResponseModality;
exports.Schema = Schema;
exports.StringSchema = StringSchema;
exports.VertexAIBackend = VertexAIBackend;
exports.VertexAIError = VertexAIError;
exports.VertexAIModel = VertexAIModel;
exports.getAI = getAI;
exports.getGenerativeModel = getGenerativeModel;
exports.getImagenModel = getImagenModel;
exports.getVertexAI = getVertexAI;
//# sourceMappingURL=index.node.cjs.js.map
