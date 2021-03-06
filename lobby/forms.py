from django.forms import ModelForm, CheckboxSelectMultiple
from .models import Lobby, Weapon, Map

# Create your forms here

class LobbyForm(ModelForm):
    """ Form to create lobby

    Inherits:
        ModelForm (Class): Basic model form
    """
    class Meta():
        model = Lobby
        fields = ('name', 'map', 'max_players', 'mode', 'win_score', 'game_runtime')

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({
            'class': "formfield"
        })
        self.fields['map'].widget.attrs.update({
            'class': "formfield"
        }) 
        self.fields['max_players'].widget.attrs.update({
            'class': "formfield"
        }) 
        self.fields['mode'].widget.attrs.update({
            'class': "formfield"
        })
        self.fields['win_score'].widget.attrs.update({
            'class': "formfield"
        }) 
        self.fields['game_runtime'].widget.attrs.update({
            'class': "formfield"
        }) 


