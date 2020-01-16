import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id
                    ? action.payload
                    : blogPost;
            });
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const res = await jsonServer.get('/blogposts');

        dispatch({ type: 'get_blogposts', payload: res.data });
    }
}

const addBlogPost = dispatch => {
    return async (title, content, navigate) => {
        await jsonServer.post('/blogposts', { title, content });
        // call the navigate function passed in after sucessfuly adding blogpost
        if(navigate) {
            navigate();
        }
    };
};

const deleteBlogPost = dispatch => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`)

        dispatch({ type: 'delete_blogpost', payload: id });
    }
};

const editBlogPost = dispatch => {
    return async (id, title, content, navigate) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content });

        dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
        // call the navigate function passed in after sucessfuly editing blogpost
        if(navigate) {
            navigate();
        }
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { 
        getBlogPosts,
        addBlogPost,
        deleteBlogPost,
        editBlogPost
    },
    []
);