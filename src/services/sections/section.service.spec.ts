import { sectionMock } from "../../mocks/entities.mock";
import ticketApi from "../../api/ticket.api";
import sectionService from "./section.service";

jest.mock("../../api/ticket.api");

describe("pricesService", () => {
  beforeEach(() => {
    (ticketApi.fetchSections as jest.Mock).mockClear();
  });

  it("should succeed if value of sections inside function changes ", async () => {
    expect(sectionService.getSections()).toEqual([]);

    (ticketApi.fetchSections as jest.Mock).mockResolvedValueOnce([sectionMock]);
    expect(await sectionService.fetchSections()).toEqual([sectionMock]);

    expect(sectionService.getSections()).toEqual([sectionMock]);
  });

  it("should return section if found otherwise it throws", async () => {
    const sectionId = 2;

    (ticketApi.fetchSections as jest.Mock).mockResolvedValueOnce([sectionMock]);
    await sectionService.fetchSections();

    expect(sectionService.findSectionById(sectionId)).toEqual(sectionMock);

    expect(() => sectionService.findSectionById(0)).toThrow();
  });
});