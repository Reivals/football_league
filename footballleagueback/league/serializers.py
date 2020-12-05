from rest_framework import serializers
from .models import Club, Footballer, Match, Goal, Card
from .enums import Result, Position, Side, CardType
from enumchoicefield import EnumChoiceField

class KeyValueField(serializers.Field):
    """ A field that takes a field's value as the key and returns
    the associated value for serialization """

    labels = {}
    inverted_labels = {}

    def __init__(self, labels, *args, **kwargs):
        self.labels = labels
        # Check to make sure the labels dict is reversible, otherwise
        # deserialization may produce unpredictable results
        inverted = {}
        for k, v in labels.items():
            if v in inverted:
                raise ValueError(
                    'The field is not deserializable with the given labels.'
                    ' Please ensure that labels map 1:1 with values'
                )
            inverted[v] = k
        self.inverted_labels = inverted
        return super(KeyValueField, self).__init__(*args, **kwargs)

    def to_representation(self, obj):
        if type(obj) is list:
            return [self.labels.get(o, None) for o in obj]
        else:
            return self.labels.get(obj, None)

    def to_internal_value(self, data):
        if type(data) is list:
            return [self.inverted_labels.get(o, None) for o in data]
        else:
            return self.inverted_labels.get(data, None)

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'  # display all fields


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

    side = EnumChoiceField(enum_class=Side)


class FootballerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footballer
        fields = '__all__'

    position = EnumChoiceField(enum_class=Position)


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

    type = EnumChoiceField(enum_class=CardType)


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = '__all__'

    goals = GoalSerializer(many=True, read_only=True)
    cards = CardSerializer(many=True, read_only=True)
    result = EnumChoiceField(enum_class=Result)
    type = EnumChoiceField(enum_class=CardType)
