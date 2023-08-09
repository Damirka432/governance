import { DeployedContracts } from "../../src-ts/types";
import { DeployParamsStruct } from "../../typechain-types/src/security-council-mgmt/factories/L2SecurityCouncilMgmtFactory";
import { Signer } from "ethers";

export interface SecurityCouncilAndChainID {
  securityCouncilAddress: string;
  chainID: number;
}

export interface ChainIDs {
  govChainID: number,
  l1ChainID: number,
}

export type ChainConfig = {
  chainID: number;
  rpcUrl: string;
  privateKey: string;
  prevEmergencySecurityCouncil: string;
}

export type GovernedChainConfig = ChainConfig & {
  upExecLocation: string;
}

export type GovernanceChainConfig = ChainConfig & {
  prevNonEmergencySecurityCouncil: string;
}

export type DeploymentConfig =
  DeployedContracts &
  Pick<
    DeployParamsStruct,
    'removalGovVotingDelay' |
    'removalGovVotingPeriod' |
    'removalGovQuorumNumerator' |
    'removalGovProposalThreshold' |
    'removalGovVoteSuccessNumerator' |
    'removalGovMinPeriodAfterQuorum' |
    'removalProposalExpirationBlocks' |
    'firstNominationStartDate' |
    'nomineeVettingDuration' |
    'nomineeVetter' |
    'nomineeQuorumNumerator' |
    'nomineeVotingPeriod' |
    'memberVotingPeriod' |
    'fullWeightDuration' |
    'firstCohort' |
    'secondCohort'
  > & {
    emergencySignerThreshold: number;
    nonEmergencySignerThreshold: number;
    govChain: GovernanceChainConfig; // e.g. ArbOne
    hostChain: ChainConfig; // e.g. Ethereum L1
    governedChains: GovernedChainConfig[]; // e.g. [Nova], governedChains DOES NOT include the governance chain (i.e. ArbOne)
    gnosisSafeL2Singleton: string;
    gnosisSafeL1Singleton: string;
    gnosisSafeFallbackHandler: string;
    gnosisSafeFactory: string;
  };

export interface ChainIDToConnectedSigner {
  [key: number]: Signer;
}

export type SecurityCouncilManagementDeploymentResult = {
  keyValueStores: {[key: number]: string};
  securityCouncilMemberSyncActions: {[key: number]: string};

  emergencyGnosisSafes: {[key: number]: string};
  nonEmergencyGnosisSafe: string;

  nomineeElectionGovernor: string;
  nomineeElectionGovernorLogic: string;
  memberElectionGovernor: string;
  memberElectionGovernorLogic: string;
  securityCouncilManager: string;
  securityCouncilManagerLogic: string;
  securityCouncilMemberRemoverGov: string;
  securityCouncilMemberRemoverGovLogic: string;

  upgradeExecRouteBuilder: string;

  activationActionContracts: {[key: number]: string};
};