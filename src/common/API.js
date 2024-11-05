import axios from "axios";

const CMS_API_NAME = "https://u6n2k0r2ih.execute-api.us-east-1.amazonaws.com/dev-realtyverse-website-cms-portal-lambda/";
const X_API_KEY_CMS = "fhD5vm5O126xLJ9IKj6CB1xc0vHgL6Hf1JjeD7WD";
const GDPR_API_NAME = "https://19yedbkdgk.execute-api.us-east-1.amazonaws.com/dev-realtyverse-gdpr-agent-portal-lambda/";
const X_API_KEY_AGENT = "T4vCcmki56auLxANHriC03R1GvwkKWfc4ydVrJcK";

export async function getGdprUserDetails(email) {
    return await axios.get(GDPR_API_NAME + `user/get-user-info?email=${decodeURIComponent(email).trim()}`,
        { headers: { 'x-api-key': X_API_KEY_AGENT, } }
    );
};

export async function updateUserRegistered(requestData) {
    return await axios.put(GDPR_API_NAME + "user/user-registered",
        requestData,
        { headers: { 'x-api-key': X_API_KEY_AGENT, } }
    );
};

export const createAgent = async (postBody) => {
    const agent = await axios.post(
        CMS_API_NAME + "crm/agent/add",
        postBody,
        { headers: { "x-api-key": X_API_KEY_CMS } }
    );
    return agent;
};

export const createUser = async (postData) => {
    const user = await axios.post(CMS_API_NAME + "user/add",
        postData,
        { headers: { "x-api-key": X_API_KEY_CMS }, }
    );
    await axios.post(CMS_API_NAME + "user/user-gdpr",
        postData,
        { headers: { "x-api-key": X_API_KEY_CMS }, }
    );
    return user;
};