# Openclassrooms: Current/previous month amount Due for mentor dashboard

You want to know your current/previous month amount due as openclassrooms mentor? This pluggin is for you!

## Installation

- Install Tampermonkey (chrome)
- Open Tampermonkey in your browser and click on "Create a new Script..." menu
- Paste oc-amount-due.js and save
- Reload your mentor dashboard on openclassrooms and expand burger menu (can takes a few seconds to appear)!

## Manuals actions

OC sessions api does not return student type (funded or self-funded) so, you have to update script to let script know them:

```
const autoFinancedStudents = ["Lastame1 Firstname1", "Lastame2 Firstname2", "Lastame3 Firstname3"];
```
NB: Be sure to well spell your student full name!
