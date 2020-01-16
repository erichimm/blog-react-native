import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [
                ...state, 
                { 
                    id: Math.floor(Math.random()*99999), 
                    title: action.payload.title,
                    content: action.payload.content
                }
            ];
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

const addBlogPost = dispatch => {
    return (title, content, navigate) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } });
        // call the navigate function passed in after sucessfuly adding blogpost
        navigate();
    };
};

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id });
    }
};

const editBlogPost = dispatch => {
    return (id, title, content, navigate) => {
        dispatch({ type: 'edit_blogpost', payload: { id, title, content } });
        // call the navigate function passed in after sucessfuly editing blogpost
        navigate();
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { 
        addBlogPost,
        deleteBlogPost,
        editBlogPost
    },
    [{ title: 'TEST POST', content: 'TEST CONTENT', id: 1 }]
);