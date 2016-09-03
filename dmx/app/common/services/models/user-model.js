import stateService from './../state/stateService';
import dmxApi from './../api/dmx-service';

const userModel = {
  async setUser(user) {
    return await stateService.setItem(dmxApi.ServiceKeys.userProfile, JSON.stringify(user));
  },
  async getUser() {
    const user = await stateService.getItem(dmxApi.ServiceKeys.userProfile);
    return JSON.parse(user);
  },
  async setCarfaxAccount(username, password) {
    try {
      const user = await this.getUser();
      // await dmxApi.saveCarfaxAccount(user._id, username, password);
      // TODO: remove password below; just adding to appease eslint no-unused-vars
      user.carfaxAccount = { username, password };
      this.setUser(user);
    } catch (error) {
      throw error;
    }
  },
  async getCarfaxAccount() {
    const user = await this.getUser();
    return user.carfaxAccount;
  },
  async removeCarfaxAccount() {
    try {
      const user = await this.getUser();
      // await dmxApi.deleteCarfaxAccount(user._id);
      delete user.carfaxAccount;
      this.setUser(user);
    } catch (error) {
      throw error;
    }
  },
  async setAppraisalSort(option) {
    try {
      const user = await this.getUser();
      // await dmxApi.saveAppraisalSort(user._id, option);
      user.appraisalSort = option;
      this.setUser(user);
    } catch (error) {
      throw error;
    }
  },
  async clearAppraisalSort() {
    try {
      const user = await this.getUser();
      // await dmxApi.deleteAppraisalSort(user._id);
      delete user.appraisalSort;
      this.setUser(user);
    } catch (error) {
      throw error;
    }
  },
};

export default userModel;
