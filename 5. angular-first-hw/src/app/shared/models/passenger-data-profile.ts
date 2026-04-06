export interface PassengerDataProfileSectionCell {
  title: string;
  data: string;
}

export interface PassengerDataProfileSection {
  title: string;
  cells: PassengerDataProfileSectionCell[];
}

export interface PassengerDataProfile {
  name: string;
  sections: PassengerDataProfileSection[];
}

export const defaultPassengerProfile: PassengerDataProfile = {
  name: 'Not Found',
  sections: [
    {
      title: 'No information to show',
      cells: [],
    },
  ],
};
