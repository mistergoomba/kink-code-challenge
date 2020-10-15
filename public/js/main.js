/**
 * @file Kink.com Main Page JavaScript
 *
 * @author Martin Boynton
 */


/**
 * Make the comments form dynamic
 */

function addCommentsFunctionality() {
    // add an onSubmit listener to the form
    const commentForm = document.getElementById('add-comment-form');
    commentForm.addEventListener('submit', submitForm);
}


/**
 * Run when user submits a comment
 * @this form element
 * @param {object} e - event object
 */

function submitForm(e) {
    e.preventDefault();

    // get important form elements
    const formFields = this.querySelectorAll('input[type=text], textarea');
    const formErrorElement = this.querySelector('.form-error');

    // determine if the form has all valid inputs
    const isValidated = validateForm(formFields);

    // show the comment and clear the form if valid, show form errors if not
    if (isValidated) {
        showNewComment(formFields, formErrorElement, this);
    } else {
        showFormErrorMessage(formErrorElement);
    }
}


/**
 * Make sure all fields are valid
 * @param {array} formFields - An array containing all form field elements
 * @returns {boolean} isValid - Return true if the form is completed correctly, false if not
 */

function validateForm(formFields) {
    // class name to add to the container elements of inputs that are not filled out correctly
    const className = 'input-error';

    // start with true, if there are any invalid inputs, this will change to false
    let isValid = true;

    // loop through all inputs
    for (let i = 0; i < formFields.length; i++) {
        // get the parent element of the input that we will potentially attach the error class to
        const formInputContainer = formFields[i].closest('.form-input');

        if (formFields[i].value === '') {
            // form field is invalid, add error class and set isValid to false
            formInputContainer.classList.add(className);
            isValid = false;
        } else {
            // form field is valid, remove any error class that may be there previously
            formInputContainer.classList.remove(className);
        }
    }

    // return true if the form is completed correctly, false if not
    return isValid;
}


/**
 * After form submit, show the new comment in the comments section
 * @param {array} formFields - An array containing all form field elements
 * @param {Element} formErrorElement - The element containing the error message
 * @param {Element} form - The new comment form element
 */

function showNewComment(formFields, formErrorElement, form) {
    // intialize comment data object
    let commentData = {
        name: '',
        comment: ''
    };

    // hide the form error element
    showFormErrorMessage(formErrorElement, true);

    // show the form success element
    const formSuccessElement = form.querySelector('.form-success');
    showFormSuccessMessage(formSuccessElement);

    // loop through fields and add information about the comment to the commentData object
    for (let i = 0; i < formFields.length; i++) {
        const field = formFields[i];
        const key = field.name;

        if (typeof commentData[key] !== 'undefined') {
            commentData[key] = field.value;
            field.value = '';
        }
    }

    // build HTML for the new comment
    const html = `
        <div class="new-comment comment-hidden">
            <div class="comment">
                <div class="comment-user-name">${commentData.name}</div>
                <div class="comment-content">${commentData.comment}</div>
            </div>
        </div>
    `;

    // get outer comments display elemebt
    const commentsDisplay = document.getElementById('comments-display');

    // add new comments HTML right underneath the header element
    commentsDisplay.querySelector('h2').insertAdjacentHTML('afterEnd', html);

    // change CSS to show the comment animating into existence
    // add short timeout to allow the DOM to update before animating
    setTimeout(function() {
        commentsDisplay.querySelector('.comment-hidden').classList.remove('comment-hidden');
    }, 100);

}


/**
 * If there are errors in the form, show the form error
 * @param {Element} formSuccessElement - The element containing the success message
 */

function showFormSuccessMessage(formSuccessElement) {
    // class name that will show the form success message
    const className = 'show-form-message';

    console.log(formSuccessElement);

    // show the success message
    formSuccessElement.classList.add(className);

    // hide the success message after a 5 seconds
    setTimeout(() => {
        formSuccessElement.classList.remove(className);
    }, 5000);
}


/**
 * If there are errors in the form, show the form error
 * @param {Element} formErrorElement - The element containing the error message
 * @param {boolean} [actuallyHideItInstead=false] - Optinally set to true if we want to hide the error
 */

function showFormErrorMessage(formErrorElement, actuallyHideItInstead) {
    // class name that will show the form error message
    const className = 'show-form-message';

    if (actuallyHideItInstead) {
        // we want to hide the form error message
        formErrorElement.classList.remove(className);
    } else {
        // we want to show the form error message
        formErrorElement.classList.add(className);
    }
}


/**
 * Run main function
 * DOM should already be loaded if added to the end of the HTML file
 */
addCommentsFunctionality();
