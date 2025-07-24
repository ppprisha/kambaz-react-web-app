export default function VariableTypes() {
    let numberVariable = 123;
    let floatingPointNumber = 234.345;
    let stringVariable = 'Hello World!';
    let booLeanVariable = true;
    let isNumber = typeof numberVariable;
    let isString = typeof stringVariable;
    let isBooLean = typeof booLeanVariable;
    return(
        <div id="wd-variable-types">
            <h4>Variable Types</h4>
            numberVariable = { numberVariable }<br/>
            floatingPointNumber = { floatingPointNumber }<br/>
            stringVariable = { stringVariable }<br/>
            booLeanVariable = { booLeanVariable + "" }<br/>
            isNumber = { isNumber }<br/>
            isString = { isString }<br/>
            isBooLean = { isBooLean }<hr/>
        </div>
    )
}