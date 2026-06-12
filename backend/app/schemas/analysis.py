from pydantic import BaseModel, ConfigDict, Field


class ProximateBasis(BaseModel):
    moisture: str = ""
    ash: str = ""
    vm: str = ""
    fc: str = ""
    gcv: str = ""


class UltimateBasis(BaseModel):
    c: str = ""
    h: str = ""
    n: str = ""
    s: str = ""
    o: str = ""


class AshFusion(BaseModel):
    idt: str = ""
    st: str = ""
    ht: str = ""
    ft: str = ""


class ElementalComposition(BaseModel):
    sio2: str = ""
    al2o3: str = ""
    fe2o3: str = ""
    cao: str = ""
    mgo: str = ""
    na2o: str = ""
    k2o: str = ""
    tio2: str = ""
    p2o5: str = ""
    so3: str = ""


class OtherTests(BaseModel):
    hgi: str = ""
    swellingIndex: str = ""
    cokeType: str = ""


class SulphurType(BaseModel):
    coal: str = ""
    sulphur: str = ""


class SulphurDistribution(BaseModel):
    pyritic: SulphurType = Field(default_factory=SulphurType)
    sulphate: SulphurType = Field(default_factory=SulphurType)
    organic: SulphurType = Field(default_factory=SulphurType)


class AnalysisPayload(BaseModel):
    model_config = ConfigDict(extra="ignore")

    proximate: dict[str, ProximateBasis] = Field(default_factory=lambda: {
        "adb": ProximateBasis(),
        "dmf": ProximateBasis(),
        "rh60": ProximateBasis(),
    })
    ultimate: dict[str, UltimateBasis] = Field(default_factory=lambda: {
        "adb": UltimateBasis(),
        "dmf": UltimateBasis(),
        "rh60": UltimateBasis(),
    })
    ashFusion: AshFusion = Field(default_factory=AshFusion)
    elemental: ElementalComposition = Field(default_factory=ElementalComposition)
    otherTests: OtherTests = Field(default_factory=OtherTests)
    sulphur: SulphurDistribution = Field(default_factory=SulphurDistribution)
