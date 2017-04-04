# jquery-prettyconfirm
Alert lib (js/css) that does not use promise for better browser compatibility

If jquery-ui is loaded, the box is draggable.

### Load css
```
<link rel="stylesheet" type="text/css" href="css/prettyconfirm.min.css">
```

### Load js
```
<script src="js/prettyconfirm.js" type="application/javascript"></script>
```

### How to use :
```javascript
_prettyConfirm.redirect('new/path/', 'Please Confirm', 'Do you want to abord ?');
```

### Default methods :
```javascript
_prettyConfirm.redirect(url, title, content);
_prettyConfirm.confirm(params);
```

### Params list :
**title** : *string* - title for the alert popup
**content** : *string* - content for the alert popup
**className** : *string* - change the class : (error, success, primary, warning) | *default : primary*
**closeOnAccept** : *boolean* - automaticaly close if click on accept button | *default : false*
**showAccept** : *boolean* - display accept button | *default : true*
**showCancel** : *boolean* - display cancel button | *default : true*
**extraParams** : *object* - extra object for callbacks | *default : {}*
**acceptCallback** : *function(extraParams)* - callback for accept button
**cancelCallback** : *function(extraParams)* - callback for cancel button
