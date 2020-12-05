from enumchoicefield import ChoiceEnum


class CardType(ChoiceEnum):
    RED = 'RED'
    YELLOW = 'YELLOW'

    @classmethod
    def choices(cls):
        return tuple((item.key, item.value) for item in cls)

    @classmethod
    def list(cls):
        return [e.value for e in CardType]


class Result(ChoiceEnum):
    HOMEWIN = 'HOMEWIN'
    AWAYWIN = 'AWAYWIN'
    DRAW = 'DRAW'

    @classmethod
    def choices(cls):
        return tuple((item.key, item.value) for item in cls)

    @classmethod
    def list(cls):
        return [e.value for e in Result]


class Side(ChoiceEnum):
    HOME = 'HOME'
    AWAY = 'AWAY'

    @classmethod
    def choices(cls):
        return tuple((item.key, item.value) for item in cls)

    @classmethod
    def list(cls):
        return [e.value for e in Position]


class Position(ChoiceEnum):
    GOALKEEPER = 'GOALKEEPER'
    DEFENDER = 'DEFENDER'
    MIDFIELDER = 'MIDFIELDER'
    STRIKER = 'STRIKER'

    @classmethod
    def choices(cls):
        return tuple((item.key, item.value) for item in cls)

    @classmethod
    def list(cls):
        return [e.value for e in Position]
